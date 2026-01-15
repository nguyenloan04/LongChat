import { UserPage } from "@/components/user/UserPage";
import { Navigate, type RouteObject } from "react-router-dom";

export const userRouter: RouteObject[] = [
    {
        path: "/user",
        element: <Navigate to="/user/user-profile" replace />,
    },
    {
        path: "/user/:key",
        element: <UserPage />,
    },
]
