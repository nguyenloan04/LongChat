import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRouter";
import Home from '@/components/home/Home';
import { MainChatUIComponent } from "@/components/chat";
import Privacy from "@/components/policy/Privacy.tsx";
import Error from "@/components/error/Error.tsx";
import ComingSoon from "@/components/comingsoon/ComingSoon.tsx";
import { userRouter } from "./userRouter";
import { JoinRoomByLink } from "@/components/room/JoinRoomByLink";

const route = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />,
            // errorElement: <Error/>
        },
        {
            path: "/chat",
            element: <MainChatUIComponent />
        },
        //Other routes here
        ...authRouter,
        ...userRouter,
        {
            path: "/g/:roomName",
            element: <JoinRoomByLink />
        },
        {
            path: "/privacy-policy",
            element: <Privacy />
        },
        {
            path: "*",
            element: <Error />
        },
        {
            path: "/comingsoon",
            element: <ComingSoon />
        }
    ],
    {
        basename: "/LongChat",
    }
)

export default route