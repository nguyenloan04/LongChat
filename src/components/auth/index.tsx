import LoginComponent from "./Login";
import { useSelector } from "react-redux";
import type { ReduxState } from "@/constants/ReduxState";
import { FormType } from "@/constants/AuthForm";
import RegisterComponent from "./Register";

export default function AuthComponent() {
    const currentForm = useSelector((state: ReduxState) => state.authForm.currentForm)

    return (
        <div className="flex justify-center items-center relative" style={{ width: "100%", height: "100vh" }}>
            <div className="w-full h-full absolute">
                <img
                    className="absolute object-cover w-full h-full z-0"
                    src="https://images.pexels.com/photos/250356/pexels-photo-250356.jpeg?cs=srgb&dl=pexels-hikaique-250356.jpg&fm=jpg" alt=""
                />
                <div className="absolute w-full h-full bg-black z-1 opacity-40"></div>
            </div>
            <div className="z-2 w-full h-full">
                {currentForm === FormType.LOGIN && <LoginComponent />}
                {currentForm === FormType.REGISTER && <RegisterComponent />}
            </div>
        </div>
    )
}