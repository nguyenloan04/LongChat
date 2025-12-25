// import { useEffect } from 'react'
// import type { ReduxState } from './constants/ReduxState'
// import { useSelector } from 'react-redux'

import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import './App.css'
import {useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";
import {useEffect} from "react";

function App() {
    //FIXME: Implement a dialog to display websocket error
    // const socketState = useSelector((state: ReduxState) => state.socketState)
    // useEffect(() => {
    //     if (socketState.errorMessage) {
    //         alert(socketState.errorMessage)
    //     }
    // }, [socketState.errorMessage])
    const theme = useSelector((state: ReduxState) => state.themeState.theme)

    useEffect(() => {
        const root = window.document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
