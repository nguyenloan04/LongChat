import type { ReduxState } from "@/constants/ReduxState"
import { setViewAttachmentIndex } from "@/redux/slices/chatSlice"
import { AnimatePresence } from "framer-motion"
import { Download, PanelRight, X, ZoomIn, ZoomOut } from "lucide-react"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { downloadImage, getThumbnail } from "@/services/storageService"

interface DisplayProps {
    index: number
    listAttachments: string[]
}

export function DisplayAttachment(props: DisplayProps) {
    const currentTarget = useSelector((state: ReduxState) => state.chatState.currentChatTarget)
    const viewAttachment = useSelector((state: ReduxState) => state.chatState.currentViewAttachment)
    const dispatcher = useDispatch()

    //Manage zoom
    const [scale, setScale] = useState(1)
    const [tabState, setTabState] = useState(true)

    const handleZoom = () => {
        setScale(prev => (prev === 1 ? 2.5 : 1))
    };

    const fileName = useMemo(() => {
        const url = props.listAttachments[props.index];
        const fullFileName = url.substring(url.lastIndexOf("/") + 1);
        return fullFileName;
    }, [props.index, props.listAttachments]);

    return (
        <AnimatePresence>
            <motion.div
                //Fade in when open
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-1000 bg-black/90 flex flex-col overflow-hidden select-none"
            >
                {/* Header */}
                <div className="z-10 flex justify-between items-center w-full py-4 px-6 bg-linear-to-b from-black/50 to-transparent">
                    <p className="text-sm font-medium text-white">
                        {currentTarget?.name}/{fileName}
                    </p>
                    <button
                        className="p-2 rounded-full hover:bg-white/40 transition-colors cursor-pointer"
                        onClick={() => dispatcher(setViewAttachmentIndex({ state: false, index: -1 }))}
                    >
                        <X className="text-white" size={24} />
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row h-[85%] w-full py-2">
                    <div className="flex-1 relative flex justify-center items-center overflow-hidden">
                        <motion.img
                            key={props.index}
                            src={props.listAttachments[props.index]}
                            alt="attachment-view"

                            //Config framer motion
                            className="max-w-[90%] max-h-[80vh] object-contain cursor-zoom-in"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: scale,
                                opacity: 1,
                                //Apply drag when zoom image
                                cursor: scale > 1 ? "grab" : "zoom-in"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}

                            //For drag
                            drag={scale > 1}    //If zoomed
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} //Keep image in div
                            dragElastic={0.5}

                            onClick={handleZoom}
                        />
                    </div>
                    <div className={`
                            hidden lg:block
                            overflow-y-auto p-2
                            transition-all duration-500 ease-in-out transform
                            no-scrollbar
                            ${tabState
                            ? "w-32 translate-x-0 opacity-100"
                            : "w-0 opacity-0 translate-x-full overflow-hidden"
                        }`}
                    >
                        <div className=" flex flex-col gap-4">
                            {props.listAttachments.map((attachment, index) => (
                                <img
                                    className={`w-28 h-28 object-cover cursor-pointer hover:opacity-60 transition-opacity ${index !== viewAttachment.index ? "opacity-40" : ""}`}
                                    src={getThumbnail(attachment)}
                                    alt={`attachment-${index}`}
                                    onClick={() => {
                                        dispatcher(setViewAttachmentIndex({
                                            state: true,
                                            index: index
                                        }))
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    {/* List attachment in mobile */}
                    <div className={`
                            lg:hidden
                            overflow-y-auto p-2
                            transition-all duration-500 ease-in-out transform
                            no-scrollbar
                            ${tabState
                            ? "w-full translate-y-0 opacity-100"
                            : "h-0 opacity-0 translate-y-full overflow-hidden"
                        }`}
                    >
                        <div className=" flex gap-4">
                            {props.listAttachments.map((attachment, index) => (
                                <img
                                    className={`w-20 h-20 object-cover cursor-pointer hover:opacity-60 transition-opacity ${index !== viewAttachment.index ? "opacity-40" : ""}`}
                                    src={getThumbnail(attachment)}
                                    alt={`attachment-${index}`}
                                    onClick={() => {
                                        dispatcher(setViewAttachmentIndex({
                                            state: true,
                                            index: index
                                        }))
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="relative flex-1 flex items-center justify-center text-center text-white/60 text-xs bg-neutral-700">
                    <div className="absolute left-8">
                        <div className="flex gap-4">
                            <div
                                onClick={() =>
                                    setScale(prev => prev / 1.5)
                                }
                            >
                                <ZoomOut
                                    size={"1.25rem"}
                                    className="text-white hover:text-neutral-400 cursor-pointer"
                                />
                            </div>
                            <div
                                onClick={() =>
                                    setScale(prev => prev * 1.5)
                                }
                            >
                                <ZoomIn
                                    size={"1.25rem"}
                                    className="text-white hover:text-neutral-400 cursor-pointer"
                                />
                            </div>
                            <div
                                className="mx-4"
                                onClick={() => downloadImage(props.listAttachments[props.index], fileName)}
                            >
                                <Download
                                    size={"1.25rem"}
                                    className="text-white hover:text-neutral-400 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                    <p className="hidden lg:block">
                        Double click hoặc nhấn vào ảnh để Zoom
                    </p>
                    <div className="absolute right-8">
                        <div className="flex gap-4">
                            <div
                                className={`transition-colors duration-300 ease-in-out p-1.5 rounded-full ${tabState ? "bg-indigo-500" : ""}`}
                                onClick={() => setTabState(!tabState)}
                            >
                                <PanelRight
                                    size={"1rem"}
                                    className=" text-white hover:text-neutral-300 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}