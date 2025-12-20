import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils"

export function ConnectionLoading({ message = "Đang kết nối đến server ..." }) {
    return (
        <div className="w-screen h-screen absolute top-0 left-0 z-100 bg-white dark:bg-gray-900 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <Spinner className="size-12" />
                <p className="text-xl mt-4">{message}</p>
            </div>
        </div>
    )
}


function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn("size-4 animate-spin", className)}
            {...props}
        />
    )
}