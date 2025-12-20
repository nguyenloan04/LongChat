// import ForgetPasswordComponent from "@/components/auth/ForgetPassword";
// import ResetPasswordComponent from "@/components/auth/ResetPasswordForm";
import LoginComponent from "@/components/auth/Login";
import RegisterComponent from "@/components/auth/Register";
import type { RouteObject } from "react-router-dom";

export const authRouter: RouteObject[] = [
    {
        path: "/login",
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