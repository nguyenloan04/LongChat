import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRouter";
import { MainChatUIComponent } from "@/components/chat";
import Privacy from "@/components/policy/Privacy.tsx";

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
        path: "/privacy-policy",
        element: <Privacy />
    }
])

export default route