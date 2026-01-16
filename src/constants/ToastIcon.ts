import type { LucideIcon } from "@/types/ToastState";
import { CircleCheck, CircleX, RefreshCw } from "lucide-react";
export const ToastKeys = {
    SERVER_ERROR: 'serverError',
    RECONNECT: 'reconnect',
    SUCCESS: 'success'
} as const;
export const ToastIcons: Record<string, LucideIcon> = {
    [ToastKeys.SERVER_ERROR]: CircleX,
    [ToastKeys.RECONNECT]: RefreshCw,
    [ToastKeys.SUCCESS]: CircleCheck
}

export type ToastIconType = keyof typeof ToastIcons