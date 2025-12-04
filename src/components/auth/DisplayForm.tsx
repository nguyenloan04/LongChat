import ForgetPasswordComponent from "./ForgetPassword";
import LoginComponent from "./Login";
import RegisterComponent from "./Register";

enum FormType {
    LOGIN = 0,
    REGISTER = 1,
    FORGET_PASSWORD = 2
}

type DisplayAuthProps = {
    currentForm: FormType
}

export const DisplayAuthForm = (props: DisplayAuthProps) => {
    const listForm = {
        [FormType.LOGIN]: <LoginComponent />,
        [FormType.REGISTER]: <RegisterComponent />,
        [FormType.FORGET_PASSWORD]: <ForgetPasswordComponent />
    }
    return listForm[props.currentForm]
}