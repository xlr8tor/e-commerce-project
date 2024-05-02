import FormWrap from "@/components/form/FormWrap";
import SigninForm from "./SigninForm";
import { getCurrentUser } from "@/actions/getCurrentUser";

const SignInPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <FormWrap>
      <SigninForm currentUser={currentUser} />
    </FormWrap>
  );
};

export default SignInPage;
