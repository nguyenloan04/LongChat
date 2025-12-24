import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRouter";
import {UserPage} from "@/components/user/UserPage.tsx";

const route = createBrowserRouter([
    {
        path: "/",
        // element: <App />
    },
    //Other routes here
    ...authRouter,
    {
        path: "/user",
        element: <UserPage />
    },
    {
        path: "/user/:key",
        element: <UserPage />
    }
])

export default route