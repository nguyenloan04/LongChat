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
                    <div className="p-2">
                        {!isOwner &&
                            <p className=" text-gray-500 text-xs font-semibold mb-1">
                                <span className="bg-gray-300 p-1 px-2 rounded-lg">
                                    {username}
                                </span>
                            </p>
                        }
                        <img
                            src={contentObj.content || ""}
                            alt="Sticker"
                            className="w-32 h-32 object-contain"
                        />
                    </div>
                );
            case "attachment":
                return (
                    <div className={`flex flex-col ${isOwner ? " items-end" : "items-start"} gap-1 my-1`}>
                        {contentObj.attachment?.map((url, idx) => (
                            <img key={idx} src={url} alt="Attachment" className="max-w-full rounded-lg" />
                        ))}
                        <div className={`w-fit mt-1 p-2 px-3 rounded-2xl
                            ${`shadow-none ${isOwner && contentObj.content ? "shadow-sm  bg-indigo-600 text-white" : contentObj.content ? "bg-white" : "bg-transparent w-full"}`}`}
                        >
                            {contentObj.content && displayMessageContent(contentObj)}
                            <div className="w-full flex justify-end">
                                {renderSendTime()}
                            </div>
                        </div>

                    </div>
                );
            case "chat":
            default:
                return (
                    <div className={`mt-1 p-2 px-3 wrap-break-word rounded-2xl shadow-sm ${`shadow-none 
                        ${isOwner
                            ? "bg-indigo-600 text-white"
                            : "bg-white"}`
                        }`}
                    >
                        {!isOwner &&
                            <p className="text-gray-500 text-xs font-semibold mb-1">
                                {username}
                            </p>
                        }
                        {contentObj.content && displayMessageContent(contentObj)}
                        {renderSendTime()}
                    </div>
                )
        }
    };

    const renderSendTime = () => (
        <p className={`${isOwner
            ? contentObj.type !== "chat" && !contentObj.content
                ? "text-gray-500"
                : "text-indigo-200"
            : "text-gray-500"
            } text-end rounded text-[10px] mt-2`}
        >
            <span className={`w-fit p-1 rounded-lg ${contentObj.type !== "chat" && !contentObj.content ? "bg-neutral-300" : ""}`}>
                {time
                    ? new Date(time)
                        .toLocaleTimeString(
                            "vi-VN",
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                                ...(
                                    new Date(time).toDateString() !== new Date(Date.now()).toDateString()
                                    && {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour12: false,
                                    }
                                )
                            }
                        )
                    : ""
                }
            </span>
        </p>
    )


    return (
        <div className="w-full">
            <div className={`flex gap-1 ${isOwner ? "justify-end" : "justify-start"}`}>
                {!isOwner &&
                    <div className="w-10 h-10 my-1 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center bg-white shrink-0">
                        <User size={20} />
                    </div>
                }
                <div className="max-w-[60%] lg:max-w-[50%]">
                    <div className="overflow-x-auto ">
                        {renderContent()}
                    </div>

                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}