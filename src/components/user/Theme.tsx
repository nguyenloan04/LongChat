import {MoonIcon, SunIcon} from "lucide-react";

export default function Theme() {
    
    return (
        <div>
            <div className="py-3 px-5 border-gray-300 border shadow-sm text-xl">
                <span className="flex gap-2 items-center justify-between">Chủ đề <SunIcon/> </span>
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
                    <div className="flex items-center px-4 gap-8">
                        <div>
                            <input id="light" type="radio" name="theme" className="peer hidden" />
                            <label
                                htmlFor="light"
                                className="block rounded-xl overflow-hidden border-2 cursor-pointer w-[18rem] transition-all duration-400 
                 border-transparent peer-checked:border-blue-500 peer-checked:shadow-lg peer-checked:shadow-blue-500/30"
                            >
                                <div className="flex gap-2 p-3 bg-blue-400 text-white font-medium">
                                    <SunIcon/> Chế độ sáng
                                </div>
                                <div className="w-full h-[12rem] bg-gray-100">
                                    <img
                                        src="https://github.githubassets.com/assets/light_preview-0fd4f11e117f.svg"
                                        className="w-full h-full object-cover"
                                        alt="Light preview"
                                    />
                                </div>
                            </label>
                        </div>

                        <div>
                            <input id="dark" type="radio" name="theme" className="peer hidden"/>
                            <label
                                htmlFor="dark"
                                className="block rounded-xl overflow-hidden border-2 cursor-pointer w-[18rem] transition-all duration-400 
                 border-transparent peer-checked:border-blue-500 peer-checked:shadow-lg peer-checked:shadow-blue-500/30"
                            >
                                <div className="flex gap-2 p-3 bg-neutral-700 text-white font-medium">
                                    <MoonIcon/> Chế độ tối
                                </div>
                                <div className="w-full h-[12rem] bg-neutral-900">
                                    <img
                                        src="https://github.githubassets.com/assets/dark_preview-988b89718a06.svg"
                                        className="w-full h-full object-cover"
                                        alt="Dark preview"
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}