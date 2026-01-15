// import { User } from "lucide-react";
//
// export function Message({ text = "", isOwner = true, username = "" }) {
//     return (
//         <div className="w-full">
//             <div className={`flex gap-1 ${isOwner ? "justify-end" : "justify-start"}`}>
//                 {!isOwner &&
//                     <div className="w-10 h-10 my-1 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center bg-white">
//                         <User />
//                     </div>
//                 }
//                 <div className="max-w-[50%]">
//                     <div className={`mt-1 p-2 px-3 rounded-2xl ${isOwner ? "bg-indigo-600 text-white" : "bg-white"}`}>
//                         {!isOwner &&
//                             <p className="text-gray-500 text-sm">
//                                 {username}
//                             </p>
//                         }
//                         <p className="my-1">{text}</p>
//                         {/* Temp */}
//                         <p className={`${isOwner ? "text-gray-300" : "text-gray-500"}  text-xs text-end`}>
//                             21:30
//                         </p>
//                     </div>
//                 </div>
//
//             </div>
//         </div>
//     )
// }
import { User } from "lucide-react";
import { extractMessageContent } from "@/services/chatService";
import { displayMessageContent } from "@/utils/chatDisplayUtil";

interface MessageProps {
    rawMessage: string;
    isOwner: boolean;
    username: string;
    time: string;
}

export function Message({ rawMessage, isOwner, username, time }: MessageProps) {
    const contentObj = extractMessageContent(rawMessage);
    if (!contentObj) return null;

    const renderContent = () => {
        if (!contentObj) return <p className="text-red-500 text-xs">Error parsing message</p>;

        switch (contentObj.type) {
            case "sticker":
                return (
                    <img
                        src={contentObj.attachment?.[0] || ""}
                        alt="Sticker"
                        className="w-32 h-32 object-contain"
                    />
                );
            case "attachment":
                return (
                    <div className="flex flex-col gap-1">
                        {contentObj.attachment?.map((url, idx) => (
                            <img key={idx} src={url} alt="Attachment" className="max-w-[200px] rounded-lg" />
                        ))}
                        {contentObj.content && displayMessageContent(contentObj)}
                    </div>
                );
            case "chat":
            default:
                return displayMessageContent(contentObj)
        }
    };

    return (
        <div className="w-full">
            <div className={`flex gap-1 ${isOwner ? "justify-end" : "justify-start"}`}>
                {!isOwner &&
                    <div className="w-10 h-10 my-1 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center bg-white shrink-0">
                        <User size={20} />
                    </div>
                }
                <div className="max-w-[60%] lg:max-w-[50%]">
                    <div className={`mt-1 p-2 px-3 rounded-2xl shadow-sm ${contentObj.type === "sticker" ? "bg-transparent shadow-none" :
                        isOwner ? "bg-indigo-600 text-white" : "bg-white"
                        }`}>
                        {!isOwner && contentObj.type !== "sticker" &&
                            <p className="text-gray-500 text-xs font-bold mb-1">
                                {username}
                            </p>
                        }
                        <div className="overflow-x-auto ">
                            {renderContent()}
                        </div>

                        {contentObj.type !== "sticker" && (
                            <p className={`${isOwner ? "text-indigo-200" : "text-gray-400"} text-[10px] text-end mt-1`}>
                                {time
                                    ? new Date(time)
                                        .toLocaleTimeString(
                                            [],
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                ...(
                                                    new Date(time).toDateString() !== new Date(Date.now()).toDateString()
                                                    && {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                    }
                                                )
                                            }
                                        )
                                    : ""
                                }
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}