import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRouter";

const route = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    //Other routes here
    ...authRouter
])

export default route