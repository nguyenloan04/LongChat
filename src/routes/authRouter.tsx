// import ForgetPasswordComponent from "@/components/auth/ForgetPassword";
// import ResetPasswordComponent from "@/components/auth/ResetPasswordForm";
import LoginComponent from "@/components/auth/Login";
import RegisterComponent from "@/components/auth/Register";
import { redirect, type RouteObject } from "react-router-dom";

const loginLoader = () => {
    const user = localStorage.getItem("user");
    if (user) {
        return redirect("/chat");
    }
    return null;
};

export const authRouter: RouteObject[] = [
    {
        path: "/login",
        loader: loginLoader,
        element: <LoginComponent />
    },
    {
        path: "/register",
        element: <RegisterComponent />
    },

    /**
     * Deprecated routes
     *  {
     *      path: "forget-password",
     *      element: <ForgetPasswordComponent />
     *  },
     *  {
     *      path: "reset-password",
     *      element: <ResetPasswordComponent />
     *  }
     */
]
