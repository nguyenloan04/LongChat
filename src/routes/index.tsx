import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRouter";
import Privacy from "@/components/policy/Privacy.tsx";

const route = createBrowserRouter([
    {
        path: "/",
        // element: <App />
    },
    //Other routes here
    ...authRouter,
    {
        path: "/privacy-policy",
        element: <Privacy />
    }
])

export default route