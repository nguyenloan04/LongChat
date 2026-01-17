import type { ToastState } from "@/types/ToastState";
import type { LucideIcon } from "lucide-react";
import { createContext, useContext, useRef, useState } from "react";

//Use Context for display toast without passing it through component
const ToastContext = createContext({
    showToast: (_msg: string, _icon?: LucideIcon) => { }
})

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastState | null>(null);
    const [isVisible, setIsVisible] = useState(false);  //Animation
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showToast = (message: string, icon?: LucideIcon) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setToast({ message, icon });
        setIsVisible(true);
        setIsVisible(false);
    };
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div
                    className={
                        `fixed bottom-5 right-5 z-100 transition-all duration-300 transform 
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                        `
                    }
                >
                    <div className="bg-white text-black px-4 py-3 rounded-xl shadow-xl border border-neutral-100 flex items-center gap-3 min-w-50">
                        {toast.icon && <toast.icon size={"1.25rem"} className="shrink-0" />}
                        <span className="font-medium text-sm">{toast.message}</span>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext)