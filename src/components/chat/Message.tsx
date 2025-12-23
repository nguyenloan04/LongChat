import { User } from "lucide-react";

export function Message({ text = "", isOwner = true, username = "" }) {
    return (
        <div className="w-full">
            <div className={`flex gap-1 ${isOwner ? "justify-end" : "justify-start"}`}>
                {!isOwner &&
                    <div className="w-10 h-10 my-1 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center bg-white">
                        <User />
                    </div>
                }
                <div className="max-w-[50%]">
                    <div className={`mt-1 p-2 px-3 rounded-2xl ${isOwner ? "bg-blue-300" : "bg-white"}`}>
                        {!isOwner &&
                            <p className="text-gray-500 text-sm">
                                {username}
                            </p>
                        }
                        <p className="my-1">{text}</p>
                        {/* Temp */}
                        <p className=" text-gray-500 text-xs text-end">
                            21:30
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}