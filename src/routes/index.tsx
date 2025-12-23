import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRouter";
import { MainChatUIComponent } from "@/components/chat";

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
    ...authRouter
])

export default route