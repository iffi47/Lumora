import { useState } from "react";
// import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, auth, signinWithGooglePopup, signinWithMailAndPassword } from "../../utlis/firebase.utils";
// import { getRedirectResult } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
// import "./sign-in.styles.scss";
import { ButtonsContainer, SignInContainer } from "./sign-in.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useDispatch } from "react-redux";
import {
  emailSigninStart,
  googleSingInStart,
} from "../../store/user/user.action";
// import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [userData, setUserData] = useState(defaultFormFields);
  const { email, password } = userData;
  const dispatch = useDispatch();
  // const { setCurrentUser } = useContext(UserContext);
  const resetFormFields = () => {
    setUserData(defaultFormFields);
  };
  const handleSubmitData = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(userData);
    // if (password !== confirmPassword) return;
    if (!password || !email) return;
    try {
      // const {user} = await signinWithMailAndPassword(email, password)
      // setCurrentUser(user)
      dispatch(emailSigninStart(email, password));
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          alert(error.message);
          break;
        case "auth/user-not-found":
          alert(error.message);
          break;
        default:
          console.error(error);
      }
    }
  };
  const signInWithGoogle = async () => {
    // await signinWithGooglePopup();
    // setCurrentUser(user);
    // await createUserDocumentFromAuth(user)
    // console.log(response);
    dispatch(googleSingInStart());
  };
  return (
    <>
      <SignInContainer>
        <h2>Welcome back.</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            required
            type="email"
            name="email"
            value={email}
            onChange={handleSubmitData}
          />
          <FormInput
            label="Enter Password"
            required
            type="password"
            name="password"
            value={password}
            onChange={handleSubmitData}
          />
          <ButtonsContainer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type="submit">
              Sign in
            </Button>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.google}
              onClick={signInWithGoogle}
              type="button"
            >
              Sign in with Google
            </Button>
          </ButtonsContainer>
        </form>
      </SignInContainer>
    </>
  );
}
