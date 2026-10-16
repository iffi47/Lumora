import { useState } from "react";
import FormInput from "../form-input/form-input.component";
// import "./sign-up-form.styles.scss";
import { SignUpContainer } from "./sign-up-form.styles";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
// import { UserContext } from "../../contexts/user.context";


const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
};


export default function SignUp() {
  const [userData, setUserData] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = userData;
  const dispatch = useDispatch();
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const handleSubmitData= (event) => {
       event.preventDefault();
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value })
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(userData);
    if (password !== confirmPassword) return;
    if (!displayName || !email) return;
    try {
      // const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // await createUserDocumentFromAuth(user, { displayName });
      // setCurrentUser(user);
      dispatch(signUpStart(email, password, displayName))
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert("User already existed!")
      }
      console.error(error);
    }
  }
  return (
    <>
      <SignUpContainer>
        <h2>New to Lumora?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput label="Display Name" required type="text" name="displayName" value={displayName} onChange={handleSubmitData} />
          <FormInput label="Email" required type="email" name="email" value={email} onChange={handleSubmitData} />
          <FormInput label="Enter Password" required type="password" name="password" value={password} onChange={handleSubmitData} />
          <FormInput label="Confirm Password" required type="password" name="confirmPassword" value={confirmPassword} onChange={handleSubmitData} />
          <Button type="submit">Create account</Button>
        </form>
      </SignUpContainer>
    </>
  )
}