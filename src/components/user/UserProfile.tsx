import {ChevronDown, ChevronRight, KeyRound, LockKeyhole, PenLine, PenTool} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";
import {setChangePasswordCheckbox} from "@/redux/slices/userPageSlice.ts";

export default function UserProfile() {
    const changePasswordCheckbox = useSelector((state: ReduxState) => state.userPageState.changePasswordCheckbox);
    const dispatch = useDispatch();
    return (
        <div className="h-full">
            <div className="py-3 ps-5 shadow-sm text-xl">
                Hồ sơ cá nhân
            </div>
            <div className="shadow-lg px-1 shadow-neutral-600/40 hidden lg:block">
                <div className="w-full h-[10rem] relative">
                    <img src="https://res.cloudinary.com/dcyo10lft/image/upload/v1766682268/app_chat_frontend_banner.png" className="w-full h-full object-cover"/>
                    <div className="w-full h-full bg-neutral-600/20 absolute top-0 bot-0"></div>
                    <div className="top-15 left-80 text-neutral-100 font-semibold text-2xl absolute montserrat">
                        <p className="shadow-xl">Khám phá những điều mới mẻ cho trang giao diện của bạn</p>
                    </div>
                </div>
            </div>
            <div className="lg:flex justify-center items-start gap-24 mt-5">
                <div className="lg:p-0 px-4">
                    <div className="lg:hidden w-full h-full mb-4">
                        <div className="relative shadow border rounded-lg overflow-hidden w-full h-[9rem]">
                            <div className="relative h-[5.5rem] w-full bg-indigo-300">
                                <img src="" className="object-cover w-full h-full"/>
                            </div>
                            <div
                                className="absolute top-14 left-4 w-[4rem] h-[4rem] me-3 border-[4px] border-gray-300 rounded-[60%]">
                                <img src="https://avatars.githubusercontent.com/u/124800719?v=4"
                                     className="object-contain rounded-[60%] p-1 w-full h-full"/>
                            </div>
                            <div className="absolute left-25">
                                <p className="font-semibold">Quýt ~~</p>
                                <p className="text-sm">group77_testuser</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="pb-2 font-semibold">Tên hiển thị</p>
                        <input type="text" className="p-2 w-full lg:w-[24rem] rounded-lg h-[3rem] border"
                               placeholder="Tên hiển thị"/>
                    </div>
                    <hr/>
                    <div className="my-4">
                        <p className="pb-2 font-semibold">Ảnh đại diện</p>
                        <button className="h-[2.5rem] cursor-pointer p-2 rounded-lg 
                        bg-indigo-500 text-white
                        hover:bg-indigo-400 flex gap-2 items-center">Đổi ảnh đại diện<PenTool
                            className="h-[1rem] w-[1rem]"/></button>
                    </div>
                    <hr/>
                    <div className="my-4">
                        <p className="pb-2 font-semibold">Biểu ngữ</p>
                        <button className="h-[2.5rem] cursor-pointer p-2 rounded-lg 
                        bg-indigo-500 text-white
                        hover:bg-indigo-400 flex gap-2 items-center">Đổi biểu ngữ<PenTool
                            className="h-[1rem] w-[1rem]"/></button>
                    </div>
                    <hr/>
                    <div className="my-4">
                        <p className="pb-2 font-semibold">Giới thiệu</p>
                        <textarea className="p-2 w-full lg:w-[24rem] rounded-lg resize-none border"
                                  placeholder="Mô tả" rows={5}/>
                    </div>
                </div>
                <div className="sticky top-5 self-start">
                    <div className="hidden lg:block w-full h-full">
                        <p className="pb-2 font-semibold">Xem trước</p>
                        <div className="relative shadow border rounded-lg overflow-hidden w-[20rem] h-[13rem]">
                            <div className="relative h-[6rem] w-full bg-indigo-300">
                                <img src="" className="object-cover w-full h-full"/>
                            </div>
                            <div
                                className="absolute top-12 left-4 w-[5.5rem] h-[5.5rem] me-3 border-[4px] border-gray-300 rounded-[60%]">
                                <img src="https://res.cloudinary.com/dcyo10lft/image/upload/v1766681918/6226b4af190a9a2cdf80de5b3652d437_wj7wt8.jpg"
                                     className="object-contain rounded-[60%] p-1 w-full h-full"/>
                            </div>
                            <div className="absolute top-35 left-4">
                                <p className="font-semibold">Quýt ~~</p>
                                <p className="text-sm">group77_testuser</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:ps-0 ps-4 flex gap-2 my-4">
                        <button className="h-[2.5rem] cursor-pointer p-2 rounded-lg 
                        bg-green-600 text-white
                        hover:bg-green-500 flex gap-2 items-center">Lưu cập nhật<PenLine
                            className="h-[1rem] w-[1rem]"/></button>
                        <button className="h-[2.5rem] cursor-pointer p-2 rounded-lg 
                        bg-neutral-500 text-white
                        hover:bg-neutral-400 flex gap-2 items-center">Đặt lại
                        </button>
                    </div>
                </div>
            </div>
            <div className="pb-15">
                <div className=" py-8 border-indigo-300 mt-4 rounded-xl w-full lg:w-[50rem] mx-auto">
                    <p className="font-semibold ps-4 lg:ps-0">Cài đặt tài khoản</p>
                    <div className="lg:flex lg:flex-col px-12 items-between justify-center">
                        <div className="lg:flex gap-4 mb-4">
                            <p className="lg:py-8 py-4 w-full lg:w-[10rem]">Đổi mật khẩu</p>
                            <div className="lg:mt-8 mb-4">
                                <div className="flex justify-between gap-2 items-center px-4 w-50 h-[2.5rem] cursor-pointer rounded-lg hover:bg-indigo-400
                        bg-indigo-500 text-white" onClick={() => {dispatch(setChangePasswordCheckbox(!changePasswordCheckbox))}}>
                                    <div className="flex gap-2 items-center">
                                        Đổi mật khẩu <KeyRound
                                        className="h-[1rem] w-[1rem]"/>
                                    </div>
                                    {changePasswordCheckbox ? <ChevronDown className="h-[1.5rem] w-[1.5rem]"/> :
                                        <ChevronRight className="h-[1.5rem] w-[1.5rem]"/>}
                                </div>
                                <div className={`${changePasswordCheckbox ? "block" : "hidden"} lg:w-100 mt-4`}>
                                    <div className="mb-4">
                                        <p className="pb-2">Mật khẩu hiện tại</p>
                                        <input type="text" className="p-2 w-full lg:w-[24rem] rounded-lg h-[3rem] border"
                                               placeholder="Mật khẩu hiện tại"/>
                                    </div>
                                    <div className="mb-4">
                                        <p className="pb-2">Mật khẩu mới</p>
                                        <input type="text" className="p-2 w-full lg:w-[24rem] rounded-lg h-[3rem] border"
                                               placeholder="Mật khẩu mới"/>
                                    </div>
                                    <div className="mb-4">
                                        <p className="pb-2">Nhập lại mật khẩu mới</p>
                                        <input type="text" className="p-2 w-full lg:w-[24rem] rounded-lg h-[3rem] border"
                                               placeholder="Nhập lại mật khẩu mới"/>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button className="h-[2.5rem] cursor-pointer p-2 rounded-lg 
                        bg-green-600 text-white
                        hover:bg-green-500 flex gap-2 items-center">Lưu mật khẩu<KeyRound
                                            className="h-[1rem] w-[1rem]"/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex gap-4">
                            <p className="w-full lg:w-[10rem] pb-4 lg:pb-0">Vô hiệu hóa tài khoản</p>
                            <button className="h-[2.5rem] cursor-pointer p-2 rounded-lg 
                        bg-red-600 text-white
                        hover:bg-red-400 flex gap-2 items-center">Vô hiệu hóa <LockKeyhole
                                className="h-[1rem] w-[1rem]"/></button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}