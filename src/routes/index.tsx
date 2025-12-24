import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRouter";
import Home from '@/components/homepage/Home';

const route = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    //Other routes here
    ...authRouter
])

export default route