import {createBrowserRouter, Navigate} from "react-router-dom";
import { authRouter } from "./authRouter";
import Home from '@/components/home/Home';
import { MainChatUIComponent } from "@/components/chat";
import Privacy from "@/components/policy/Privacy.tsx";
import {UserPage} from "@/components/user/UserPage.tsx";
import Error from "@/components/error/Error.tsx";

const route = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/chat",
        element: <MainChatUIComponent />
    },
    //Other routes here
    ...authRouter,
    {
        path: "/privacy-policy",
        element: <Privacy />
    },
    {
        path: "/user",
        element: <Navigate to="/user/user-profile" replace />,
    },
    {
        path: "/user/:key",
        element: <UserPage />,
    },
    {
        path:"*",
        element: <Error></Error>
    }
    
])

export default route