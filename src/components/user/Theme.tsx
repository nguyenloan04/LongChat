import {MoonIcon, SunIcon} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";
import {setTheme} from "@/redux/slices/userPageSlice.ts";

export default function Theme() {
    const theme = useSelector((state: ReduxState) => state.userPageState.theme)
    const dispatch = useDispatch();
    
    return (
        <div className="h-[100vh] lg:h-full">
            <div className="py-3 px-5 border-gray-300 border shadow-sm text-xl">
                <span className="flex gap-2 items-center justify-between">Chủ đề
                    {theme === "light" ? <SunIcon/> : <MoonIcon />} </span>
            </div>
            <div className="p-4">
                <div className="text-gray-700 font-light dark:text-neutral-300">Chọn giao diện hiển thị cho ứng dụng
                    chat.
                    Bạn có thể chọn một chủ đề cố định hoặc đồng bộ với hệ thống để tự động chuyển giữa chế độ sáng và
                    tối.
                    Mọi thay đổi sẽ được áp dụng ngay và được lưu tự động.
                </div>
                <div>
                    <div className="text-lg py-4">
                        Cài đặt giao diện
                    </div>
                    <div className="lg:flex items-center px-4 gap-8">
                        <div className={`block rounded-xl mb-4 lg:mb-0 overflow-hidden border-2 cursor-pointer mx-auto lg:mx-0 w-[14rem] lg:w-[18rem] ${theme === "light" ? "border-indigo-500 shadow-xl shadow-indigo-500/30" : ""}`}
                             onClick={() => dispatch(setTheme("light"))}>
                            <div className="flex gap-2 p-3 bg-indigo-400 text-white font-medium">
                                <SunIcon/> Chế độ sáng
                            </div>
                            <div className="w-full h-[8rem] lg:h-[12rem] bg-gray-100">
                                <img
                                    src="https://res.cloudinary.com/dcyo10lft/image/upload/v1766681547/light_preview-0fd4f11e117f_mik9ek.svg"
                                    className="w-full h-full object-cover"
                                    alt="Light preview"
                                />
                            </div>
                        </div>

                        <div className={`block rounded-xl overflow-hidden border-2 cursor-pointer mx-auto lg:mx-0 w-[14rem] lg:w-[18rem] ${theme === "dark" ? "border-indigo-500 shadow-lg shadow-indigo-500/30" : ""}`}
                             onClick={() => dispatch(setTheme("dark"))}>
                            <div className="flex gap-2 p-3 bg-neutral-700 text-white font-medium">
                                <MoonIcon/> Chế độ tối
                            </div>
                            <div className="w-full h-[8rem] lg:h-[12rem] bg-neutral-900">
                                <img
                                    src="https://res.cloudinary.com/dcyo10lft/image/upload/v1766681547/dark_preview-988b89718a06_ak9mmm.svg"
                                    className="w-full h-full object-cover"
                                    alt="Dark preview"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}