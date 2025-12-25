import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRouter";
import Home from '@/components/homepage/Home';
import { MainChatUIComponent } from "@/components/chat";

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
    ...authRouter
])

export default route