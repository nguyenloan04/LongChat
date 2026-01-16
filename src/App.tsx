import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import type { ReduxState } from "@/constants/ReduxState.ts";
import { useEffect } from "react";
import { ToastProvider, useToast } from './contexts/ToastContext.tsx';
import { clearToastMessage } from './redux/slices/socketSlice.ts';
import { ToastIcons, ToastKeys, type ToastIconType } from './constants/ToastIcon.ts';

const ToastListener = () => {
    const toast = useSelector((state: ReduxState) => state.socketState.socketToast);
    const { showToast } = useToast();
    const dispatcher = useDispatch()

    useEffect(() => {
        if (!toast) return
        const Icon = toast.icon ? ToastIcons[toast.icon] : undefined
        showToast(toast.message, Icon)

        const inCludeClearToastKey = new Set<ToastIconType>([ToastKeys.RECONNECT, ToastKeys.SERVER_ERROR])

        const timer = setTimeout(() => {
            if (toast.icon && !inCludeClearToastKey.has(toast.icon)) {
                dispatcher(clearToastMessage())
            }
        }, 3000)
        return () => clearTimeout(timer)
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
