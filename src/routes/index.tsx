import App from "@/App";
import { createBrowserRouter } from "react-router-dom";

const route = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    //Other routes here
])

export default route