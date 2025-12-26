import {createBrowserRouter, Navigate} from "react-router-dom";
import { authRouter } from "./authRouter";
import { MainChatUIComponent } from "@/components/chat";
import {UserPage} from "@/components/user/UserPage.tsx";

const route = createBrowserRouter([
    {
        path: "/",
        // element: <App />
    },
    {
        path: "/chat",
        element: <MainChatUIComponent />
    },
    //Other routes here
    ...authRouter,
    {
        path: "/user",
        element: <Navigate to="/user/user-profile" replace />,
    },
    {
        path: "/user/:key",
        element: <UserPage />,
    },
    
])

export default route