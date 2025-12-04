import App from "@/App";
import AuthComponent from "@/components/auth";
import { createBrowserRouter } from "react-router-dom";

const route = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    //Other routes here
    {
        path: "/login",
        element: <AuthComponent />
    }
])

export default route