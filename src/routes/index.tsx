import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRouter";
import Home from '@/components/home/Home';
import { MainChatUIComponent } from "@/components/chat";
import Privacy from "@/components/policy/Privacy.tsx";

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
    }
])

export default route