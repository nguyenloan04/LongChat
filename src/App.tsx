// import { useEffect } from 'react'
// import type { ReduxState } from './constants/ReduxState'
// import { useSelector } from 'react-redux'

import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";
import {useEffect} from "react";
import {setCurrentUser} from "@/redux/slices/userSlice.ts";

function App() {
    //FIXME: Implement a dialog to display websocket error
    // const socketState = useSelector((state: ReduxState) => state.socketState)
    // useEffect(() => {
    //     if (socketState.errorMessage) {
    //         alert(socketState.errorMessage)
    //     }
    // }, [socketState.errorMessage])
    const theme = useSelector((state: ReduxState) => state.userPageState.theme)
    //const dispatch = useDispatch();

    useEffect(() => {
        const root = window.document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);
    // Test data. Delete later.
    // useEffect(() => {
    //     dispatch(setCurrentUser({
    //         user: {
    //             username: "22130276",
    //             avatar: "https://res.cloudinary.com/dcyo10lft/image/upload/v1766681918/6226b4af190a9a2cdf80de5b3652d437_wj7wt8.jpg",
    //             displayName: "Trần Minh Thư",
    //             banner: {
    //                 type: "color",
    //                 content: "#6366f1",
    //             },
    //             description: "",
    //             reloginCode: ""
    //         }
    //     }));
    // }, []);
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
