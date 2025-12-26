import {ChevronDown, ChevronRight, ImagePlus, KeyRound, LockKeyhole, PenLine, PenTool, X} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";
import {
    needRefreshEditUserForm,
    setChangePasswordCheckbox,
    setChooseBannerType,
    setOpenChangeBanner
} from "@/redux/slices/userPageSlice.ts";
import {useEffect} from "react";
import {
    setAvatarEditUserForm, setBannerEditUserForm,
    setDescriptionEditUserForm,
    setDisplayNameEditUserForm,
    setEditUserForm
} from "@/redux/slices/editUserFormSlice.ts";
import {Navigate} from "react-router-dom";

export default function UserProfile() {
    const changePasswordCheckbox = useSelector((state: ReduxState) => state.userPageState.changePasswordCheckbox)
    const flagRefreshEditUserForm = useSelector((state: ReduxState) => state.userPageState.flagRefreshEditUserForm)
    const chooseBannerType = useSelector((state: ReduxState) => state.userPageState.chooseBannerType)
    const openChangeBanner = useSelector((state: ReduxState) => state.userPageState.openChangeBanner);
    const user = useSelector((state: ReduxState) => state.currentUser.user)
    const dispatch = useDispatch();
    const avatar = useSelector((state: ReduxState) => state.editUserState.avatar)
    const displayName = useSelector((state: ReduxState) => state.editUserState.displayName)
    const bannerType = useSelector((state: ReduxState) => state.editUserState.banner.type)
    const bannerContent = useSelector((state: ReduxState) => state.editUserState.banner.content)
    const description = useSelector((state: ReduxState) => state.editUserState.description)
    
    useEffect(() => {
        if (!user) return;
        
        dispatch(
            setEditUserForm({
                avatar: user.avatar,
                displayName: user.displayName,
                banner: {
                    type: user.banner?.type,
                    content: user.banner?.content,
                },
                description: user.description,
            })
        );
    }, [user, flagRefreshEditUserForm]);
    
    if (!user) return <Navigate to={"/"} replace />
    
    const handleChangeAvatar = (event: any) => {
        const file = event.target.files[0];
        if (!(file && file.type.startsWith("image/"))) return;

        const previewUrl = URL.createObjectURL(file);
        dispatch(setAvatarEditUserForm(previewUrl));
    }
    
    const handleChangeBannerImage = (event: any) => {
        const file = event.target.files[0];
        if (!(file && file.type.startsWith("image/"))) return;

        const previewUrl = URL.createObjectURL(file);
        dispatch(setBannerEditUserForm({
            type: "image", content: previewUrl
        }));
    }

    return (
        <div className="h-full">
            <div className="py-3 ps-5 shadow-sm text-xl">
                Hồ sơ cá nhân
            </div>
            <div className="shadow-lg px-1 shadow-neutral-600/40 hidden lg:block">
                <div className="w-full h-[10rem] relative">
                    <img
                        src="https://res.cloudinary.com/dcyo10lft/image/upload/v1766682268/app_chat_frontend_banner.png"
                        className="w-full h-full object-cover"/>
                    <div className="w-full h-full bg-neutral-600/20 absolute top-0 bot-0"></div>
                    <div className="top-15 left-80 text-neutral-100 font-semibold text-2xl absolute montserrat">
                        <p className="shadow-xl">Khám phá những điều mới mẻ cho trang giao diện của bạn</p>
                    </div>
                </div>
            </div>
            <div className="lg:flex justify-center items-start gap-24 mt-5">
                <div className="lg:p-0 px-4">
                    <div className="lg:hidden w-full h-full mb-4">
                        <div
                            className="shadow border rounded-lg overflow-hidden w-[20rem] mx-auto">
                            <div className="relative h-[9rem]">
                                <div className="relative h-[6rem] w-full bg-indigo-300">
                                    <img src={bannerType === "image" ? bannerContent : ""}
                                         className="object-cover w-full h-full"/>
                                </div>
                                <div
                                    className="absolute top-12 left-4 w-[5.5rem] h-[5.5rem] me-3 border-[4px] border-gray-300 rounded-[60%]">
                                    <img src={avatar}
                                         className="object-contain rounded-[60%] p-1 w-full h-full"/>
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                                <p className="font-semibold">{displayName}</p>
                                <p className="text-sm">{user.username}</p>
                                <p className="mt-4 w-full break-all">{description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="pb-2 font-semibold">Tên hiển thị</p>
                        <input type="text" className="p-2 w-full lg:w-[24rem] rounded-lg h-[3rem] border"
                               placeholder="Tên hiển thị" value={displayName}
                               onChange={(e) => dispatch(setDisplayNameEditUserForm(e.target.value))}/>
                    </div>
                    <hr/>
                    <div className="my-4">
                        <p className="pb-2 font-semibold">Ảnh đại diện</p>
                        <input id="change-avatar" type="file" accept="image/*" className="hidden"
                               onChange={handleChangeAvatar}/>
                        <label htmlFor="change-avatar" className="h-[2.5rem] cursor-pointer rounded-lg 
                        bg-indigo-500 text-white w-[10rem] px-2
                        hover:bg-indigo-400 flex gap-2 items-center">Đổi ảnh đại diện<PenTool
                            className="h-[1rem] w-[1rem]"/></label>
                    </div>
                    <hr/>
                    <div className="my-4">
                        <p className="pb-2 font-semibold">Biểu ngữ</p>
                        <button className="h-[2.5rem] cursor-pointer p-2 rounded-lg 
                        bg-indigo-500 text-white
                        hover:bg-indigo-400 flex gap-2 items-center" onClick={() => dispatch(setOpenChangeBanner(true))}>Đổi biểu ngữ<PenTool
                            className="h-[1rem] w-[1rem]"/></button>
                    </div>
                    <hr/>
                    <div className="my-4">
                        <p className="pb-2 font-semibold">Giới thiệu</p>
                        <textarea className="p-2 w-full lg:w-[24rem] rounded-lg resize-none border"
                                  placeholder="Mô tả" maxLength={100} rows={5} value={description}
                                  onChange={(e) => dispatch(setDescriptionEditUserForm(e.target.value))}/>
                    </div>
                </div>
                <div className="sticky top-5 self-start">
                    <div className="hidden lg:block w-full h-full">
                        <p className="pb-2 font-semibold">Xem trước</p>
                        <div
                            className="shadow border rounded-lg overflow-hidden w-[20rem]">
                            <div className="relative h-[9rem]">
                                <div className="relative h-[6rem] w-full" style={{
                                    backgroundColor: bannerType === "color" ? bannerContent : undefined,
                                }}>
                                    <img src={bannerType === "image" ? bannerContent : ""}
                                         className={`${bannerType === "color" ? "hidden" : ""} object-cover w-full h-full`}/>
                                </div>
                                <div
                                    className="absolute top-12 left-4 w-[5.5rem] h-[5.5rem] me-3 border-[4px] border-gray-300 rounded-[60%]">
                                    <img src={avatar}
                                         className="object-cover rounded-[60%] p-1 w-full h-full"/>
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                                <p className="font-semibold">{displayName}</p>
                                <p className="text-sm">{user.username}</p>
                                <p className="mt-4 w-full break-all">{description}</p>
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
                        hover:bg-neutral-400 flex gap-2 items-center" onClick={() => dispatch(needRefreshEditUserForm())}>Đặt lại
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
                        bg-indigo-500 text-white" onClick={() => {
                                    dispatch(setChangePasswordCheckbox(!changePasswordCheckbox))
                                }}>
                                    <div className="flex gap-2 items-center">
                                        Đổi mật khẩu <KeyRound
                                        className="h-[1rem] w-[1rem]"/>
                                    </div>
                                    {changePasswordCheckbox ?
                                        <ChevronDown className="h-[1.5rem] w-[1.5rem] hover:mt-2"/> :
                                        <ChevronRight className="h-[1.5rem] w-[1.5rem] hover:me-2"/>}
                                </div>
                                <div className={`${changePasswordCheckbox ? "block" : "hidden"} lg:w-100 mt-4`}>
                                    <div className="mb-4">
                                        <p className="pb-2">Mật khẩu hiện tại</p>
                                        <input type="password"
                                               className="p-2 w-full lg:w-[24rem] rounded-lg h-[3rem] border"
                                               placeholder="Mật khẩu hiện tại"/>
                                    </div>
                                    <div className="mb-4">
                                        <p className="pb-2">Mật khẩu mới</p>
                                        <input type="password"
                                               className="p-2 w-full lg:w-[24rem] rounded-lg h-[3rem] border"
                                               placeholder="Mật khẩu mới"/>
                                    </div>
                                    <div className="mb-4">
                                        <p className="pb-2">Nhập lại mật khẩu mới</p>
                                        <input type="password"
                                               className="p-2 w-full lg:w-[24rem] rounded-lg h-[3rem] border"
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
            {openChangeBanner && (
                <div className="flex justify-center items-center fixed dark:bg-black/60 bg-black/40 z-200 inset-0"
                     onClick={() => dispatch(setOpenChangeBanner(false))}>
                    <div className="border bg-white dark:bg-gray-700 w-80 h-50 rounded-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-3">
                            <p className="ps-1 font-semibold text-lg">Chọn một biểu ngữ</p>
                            <X className="w-8 h-8 p-1 hover:bg-neutral-300/50 rounded cursor-pointer" 
                               onClick={() => dispatch(setOpenChangeBanner(false))}/>
                        </div>
                        <div className="flex justify-center gap-18">
                            <div className="text-center cursor-pointer" onClick={() => dispatch(setChooseBannerType("color"))}>
                                <p className={`${chooseBannerType === "color" && "font-semibold"} px-4`}>Màu sắc</p>
                                <div className={`transform transition-transform duration-300 ease-in-out ${chooseBannerType === "color" ? "scale-x-100" : "scale-x-0"} w-full h-0.5 border border-indigo-400 shadow shadow-indigo-300 
                                        rounded-lg bg-indigo-400`}></div>
                            </div>
                            <div className="text-center cursor-pointer" onClick={() => dispatch(setChooseBannerType("image"))}>
                                <p className={`${chooseBannerType === "image" && "font-semibold"} px-4`}>Hình ảnh</p>
                                <div className={`transform transition-transform duration-300 ease-in-out ${chooseBannerType === "image" ? "scale-x-100" : "scale-x-0"} w-full h-0.5 border border-indigo-400 shadow shadow-indigo-300 
                                        rounded-lg bg-indigo-400`}></div>
                            </div>
                        </div>
                        <div className="w-full text-center p-5">
                            {chooseBannerType === "color" ? (
                                    <input type="color" value={bannerType === "color" ? bannerContent : "#6366f1"} className="cursor-pointer w-30 h-15"
                                    onChange={(e) => dispatch(setBannerEditUserForm({
                                        type: "color", content: e.target.value,
                                    }))}/>
                                ) :
                                (
                                    <div>
                                    <label htmlFor="choose-banner">
                                            <ImagePlus className="border bg-neutral-300 text-neutral-600 hover:bg-neutral-200 cursor-pointer mx-auto rounded-lg 
                                    w-30 h-15 p-3.5 hover:text-neutral-600/40 hover:scale-x-110 hover:scale-y-110" />
                                        </label>
                                        <input id="choose-banner" type="file" className="hidden" accept="image/*" onChange={handleChangeBannerImage}/>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}