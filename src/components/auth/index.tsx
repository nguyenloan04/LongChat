import { useState } from "react";
import { FormType } from "./DisplayForm";
import LoginComponent from "./Login";

export default function AuthComponent() {
    const [currentForm, switchForm] = useState(FormType.LOGIN)

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
            </div>
        </div>
    )
}