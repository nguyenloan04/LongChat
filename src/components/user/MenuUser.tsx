import {HeadsetIcon, InfoIcon, LogOutIcon, PaletteIcon, ShieldIcon, UserIcon} from "lucide-react";
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";

export default function MenuUser(props: {text: string}) {
    const user = useSelector((state: ReduxState) => state.currentUser.user)
    const navigate = useNavigate();
    const setting = [
        {   
            key: "user-profile",
            icon: <UserIcon/>,
            content: "Hồ sơ cá nhân",
            action: () => {
                navigate("/user/user-profile");
            }
        },
        {   
            key: "theme",
            icon: <PaletteIcon/>,
            content: "Chủ đề",
            action: () => {
                navigate("/user/theme");
            }
        }
    ]

    const policy = [
        {   
            key: "privacy",
            icon: <ShieldIcon/>,
            content: "Quyền riêng tư",
            action: () => {
                navigate("/user/privacy");
            }
        },
        {   
            key: "contact",
            icon: <HeadsetIcon/>,
            content: "Liên hệ",
            action: () => {
                navigate("/user/contact");
            }
        }
    ]

    const other = [
        {   
            key: "about-us",
            icon: <InfoIcon/>,
            content: "Về chúng tôi",
            action: () => {
                navigate("/user/about-us");
            }
        },
        {
            icon: <LogOutIcon/>,
            decor: "text-red-700 hover:text-red-500 hover:bg-white dark:text-red-400 " +
                "dark:hover:text-red-300 dark:hover:bg-neutral-900/50",
            content: "Đăng xuất",
            action: () => {
            }
        }
    ]
    if(!user) return <Navigate to="/" replace />;

    return (
        <div className="flex h-[100%] flex-col justify-between shadow dark:shadow-gray-300">
            <div>
                <div className="flex items-center p-2 justify-center shadow dark:shadow-gray-300">
                    <div className="w-[4rem] h-[4rem] me-3 border-[4px] border-gray-300 rounded-[60%]">
                        <img src={user.avatar}
                             className="object-cover rounded-[60%] p-1 w-full h-full"/>
                    </div>
                    <div>
                        <div className="truncate max-w-[8rem]">{user.username}</div>
                        <div className="text-sm flex gap-1 text-gray-500 dark:text-neutral-300 items-center">
                            <span className="rounded-full h-2 w-2 bg-green-500"></span>
                            <span>Đang hoạt động</span>
                        </div>
                    </div>
                </div>
                <div className="p-4 px-2">
                <div className="text-gray-500 px-2 pb-1 font-semibold text-sm dark:text-neutral-300">
                        Cài đặt người dùng
                    </div>
                    {setting.map(value => (
                        <div className={`flex gap-2 py-2 px-2 items-center cursor-pointer 
                         transition-all duration-300 ease-in-out rounded-sm
                        ${props.text === value.key ? "bg-neutral-300 font-semibold dark:bg-neutral-700": 
                            "hover:text-gray-600 hover:bg-neutral-100 hover:px-3 dark:hover:bg-neutral-600/50 dark:hover:text-neutral-300"}`}
                        onClick={value.action}>
                            {value.icon} <span>{value.content}</span>
                        </div>
                    ))}
                </div>
                <div className={"pb-4 px-2 "}>
                    <div className="text-gray-500 pb-1 px-2 font-semibold text-sm dark:text-neutral-300">
                        Quyền lợi & chính sách
                    </div>
                    {policy.map(value => (
                        <div className={`flex gap-2 py-2 px-2 items-center cursor-pointer 
                         transition-all duration-300 ease-in-out rounded-sm
                        ${props.text === value.key ? "bg-neutral-300 font-semibold dark:bg-neutral-700" :
                            "hover:text-gray-600 hover:bg-neutral-100 hover:px-3 dark:hover:bg-neutral-600/50 dark:hover:text-neutral-300"}`}
                             onClick={value.action}>
                            {value.icon} <span>{value.content}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 px-2">
                {other.map(value => (
                    <div className={`${value.decor} flex gap-2 py-2 px-2 items-center cursor-pointer 
                         transition-all duration-300 ease-in-out rounded-sm
                        ${props.text === value.key ? "bg-neutral-300 font-semibold dark:bg-neutral-700" :
                        "hover:text-gray-600 hover:bg-neutral-100 hover:px-3 dark:hover:bg-neutral-600/50 dark:hover:text-neutral-300"}`}
                         onClick={value.action}>
                        {value.icon} <span>{value.content}</span></div>
                ))}
            </div>
        </div>
    );
}