import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export interface ToastState {
    message: string;
    icon?: LucideIcon;
}