import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  signinSuccess,
  signinFailure,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";
import { getDoc } from "firebase/firestore";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signinWithGooglePopup,
  signinWithMailAndPassword,
  signOutUser as firebaseSignOutUser,
  createAuthUserWithEmailAndPassword,
} from "../../utlis/firebase.utils";

export function* getUserSnapshotFromAuth(userData, additionalDetails) {
  try {
    const userDocRef = yield call(
      createUserDocumentFromAuth,
      userData,
      additionalDetails,
    );
    const userSnapShot = yield call(getDoc, userDocRef);
    yield put(signinSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signinFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signinWithGooglePopup);
    yield call(getUserSnapshotFromAuth, user);
  } catch (error) {
    yield put(signinFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(signinWithMailAndPassword, email, password);
    yield call(getUserSnapshotFromAuth, user);
  } catch (error) {
    yield put(signinFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getUserSnapshotFromAuth, user, additionalDetails);
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password,
    );
    // yield call(createUserDocumentFromAuth, user, { displayName });
    // yield call(getUserSnapshotFromAuth, user);
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signOut() {
  try {
    yield call(firebaseSignOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signinFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getUserSnapshotFromAuth, userAuth);
  } catch (error) {
    yield put(signinFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}
export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
