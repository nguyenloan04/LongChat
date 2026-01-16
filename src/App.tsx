import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import type { ReduxState } from "@/constants/ReduxState.ts";
import { useEffect } from "react";
import { ToastProvider, useToast } from './contexts/ToastContext.tsx';
import { clearToastMessage } from './redux/slices/socketSlice.ts';
import { ToastIcons } from './constants/ToastIcon.ts';

const ToastListener = () => {
    const toast = useSelector((state: ReduxState) => state.socketState.socketToast);
    const { showToast } = useToast();
    const dispatcher = useDispatch()

    useEffect(() => {
        if (toast) {
            showToast(toast.message, toast.icon ? ToastIcons[toast.icon] : undefined);
            setTimeout(() => {
                dispatcher(clearToastMessage())
            }, 3000)
        }
    }, [toast]);

    return null;
};

function App() {
    const theme = useSelector((state: ReduxState) => state.userPageState.theme)
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
        <ToastProvider>
            <ToastListener />
            <RouterProvider router={router} />
        </ToastProvider>
    )
}

export default App
