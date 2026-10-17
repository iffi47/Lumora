import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  collection,
  writeBatch,
  runTransaction,
  serverTimestamp,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(app);
export const signinWithGooglePopup = () => signInWithPopup(auth, provider);
export const signinWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);
export const signinWithMailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  seedId,
) => {
  // An explicit seed ID makes the entire import atomic and safe to rerun.
  if (seedId) {
    return runTransaction(db, async (transaction) => {
      const marker = doc(db, "catalogMigrations", seedId);
      if ((await transaction.get(marker)).exists()) return false;
      const references = objectsToAdd.map((element) =>
        doc(db, collectionKey, element.title.toLowerCase()),
      );
      const snapshots = await Promise.all(
        references.map((ref) => transaction.get(ref)),
      );
      if (snapshots.some((snapshot) => snapshot.exists())) {
        throw new Error(
          "Seed stopped: a destination category already exists. Existing data was not overwritten.",
        );
      }
      references.forEach((ref, index) =>
        transaction.set(ref, objectsToAdd[index]),
      );
      transaction.set(marker, {
        completedAt: serverTimestamp(),
        count: objectsToAdd.length,
      });
      return true;
    });
  }
  const collectionReference = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((element) => {
    const docRef = doc(collectionReference, element.title.toLowerCase());
    batch.set(docRef, element);
  });
  await batch.commit();
  //  console.log("Done!");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((docSnapShot) => docSnapShot.data());
};
export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  //  console.log(userDocRef);
  const userSnapShot = await getDoc(userDocRef);
  //  console.log(userSnapShot, userSnapShot.exists());
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return firebaseCreateUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  if (!auth) return;
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  //  console.log(callback);
  onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    );
  });
};
