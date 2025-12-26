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
        element: <UserPage />,
        children: [
            { index: true, element: <Navigate to="user-profile" replace /> },
            { path: ":key", element: <UserPage /> }
        ]
    }
])

export default route