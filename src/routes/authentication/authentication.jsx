import SignUp from "../../components/signup/sign-up-form.component";
import SignIn from "../../components/sign-in/sign-in-form.component";
import { AuthenticationContainer } from "./authentication.styles";
export default function Authentication() {
  return (
    <div className="page-width account-page">
      <div className="page-intro">
        <span className="eyebrow">Your little corner of Lumora</span>
        <h1>Make yourself at home.</h1>
        <p>Welcome back, or welcome to something lovely.</p>
      </div>
      <AuthenticationContainer>
        <SignIn />
        <SignUp />
      </AuthenticationContainer>
    </div>
  );
}
