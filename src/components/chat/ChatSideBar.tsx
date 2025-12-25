import { Contact, LogOut, MessageCircleMore, Settings, User } from "lucide-react"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

export function ChatSideBar() {
    const [activeIndex, changeActiveIndex] = useState(-1)
    const [popupState, setPopupState] = useState(false)

    const listFeature = [
        {
            name: 'Tin nhắn',
            icon: <MessageCircleMore />
        },
        {
            name: 'Liên lạc',
            icon: <Contact />
        }
    ]

    const listOtherFeature = [
        {
            name: 'Cài đặt',
            icon: <Settings />
        }
    ]

    return (
        <div className="p-1 gap-2 flex flex-col justify-between h-full bg-indigo-500">
            <div>
                {listFeature.map((ele, index) => (
                    <div
                        className={`p-3 my-1 rounded-md flex flex-col items-center justify-center hover:bg-indigo-800/50 text-neutral-50 ${activeIndex === index && "bg-indigo-900 hover:bg-indigo-800"}`}
                        title={ele.name}
                        onClick={() => changeActiveIndex(index)}
                    >
                        {ele.icon}
                    </div>
                ))}
            </div>

            <div className="">
                {listOtherFeature.map((ele, index) => (
                    <div
                        className={`p-3 my-1 rounded-md flex flex-col items-center justify-center hover:bg-indigo-800/50 text-neutral-50 ${activeIndex === listFeature.length + index && "bg-indigo-900 hover:bg-indigo-800"}`}
                        title={ele.name}
                        onClick={() => changeActiveIndex(index + listFeature.length)}
                    >
                        {ele.icon}
                    </div>
                ))}
                <Popover open={popupState} onOpenChange={setPopupState}>
                    <PopoverTrigger className="cursor-pointer">
                        <img
                            className="rounded-2xl p-1"
                            src="https://avatars.githubusercontent.com/u/124552069" alt=""
                        />
                    </PopoverTrigger>
                    <PopoverContent className="w-60 ms-14 -mb-13 p-3">
                        <UserPopup />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

const UserPopup = () => {
    const listFeature = [
        {
            title: "Thông tin của bạn",
            icon: <User size={"1rem"} />
        }
    ]


    return (
        <div>
            <div className="flex gap-2 mb-2">
                <img
                    className="rounded-2xl w-12 h-12"
                    src="https://avatars.githubusercontent.com/u/124552069" alt=""
                />
                <div>
                    <p>group77_testuser</p>
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-neutral-500">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Đang hoạt động</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex flex-col gap-1 my-1">
                {
                    listFeature.map(ele => (
                        <div className="flex gap-2 items-center cursor-pointer hover:bg-neutral-100 rounded p-1 active:bg-neutral-200">
                            {ele.icon}
                            <span className="text-sm">{ele.title}</span>
                        </div>
                    ))
                }
                <div className="flex gap-2 items-center cursor-pointer text-red-700 hover:text-red-600 hover:bg-neutral-100 rounded p-1 active:bg-neutral-200">
                    <LogOut size={"1rem"} />
                    <span className="text-sm">Đăng xuất</span>
                </div>
            </div>
        </div>
    )
}