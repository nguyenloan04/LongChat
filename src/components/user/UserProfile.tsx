import {
    ChevronDown, ChevronRight, ImagePlus, InfoIcon, KeyRound, LockKeyhole, PenLine, PenTool, SettingsIcon, X
} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";
import {
    needRefreshEditUserForm,
    setChangePasswordCheckbox,
    setChooseBannerType,
    setOpenChangeBanner
} from "@/redux/slices/userPageSlice.ts";
import {useEffect, useState} from "react";
import {
    setAvatarEditUserForm, setBannerEditUserForm,
    setDescriptionEditUserForm,
    setDisplayNameEditUserForm,
    setEditUserForm
} from "@/redux/slices/editUserFormSlice.ts";
import {Navigate} from "react-router-dom";
import {setCurrentUser} from "@/redux/slices/userSlice.ts";

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
    const [isUpdate, setIsUpdate] = useState(false);

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

    if (!user) return <Navigate to={"/"} replace/>

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

    const submitEditUserForm = () => {
        setIsUpdate(true);
        //Update db (optional)
        
        dispatch(setCurrentUser(
            {
                username: user.username,
                avatar: avatar,
                displayName: displayName,
                banner: {
                    type: bannerType,
                    content: bannerContent,
                },
                description: description
            }
        ));
        setIsUpdate(false);
        window.alert("Bạn đã cập nhật thành công!")
    }

    return (
        <div className="h-full">
            <div className="py-3 ps-5 shadow-sm border-gray-300 border text-xl">
                Hồ sơ cá nhân
            </div>
            <div className="px-4">
                <div className="text-gray-700 font-light dark:text-neutral-300 py-4 hidden lg:block">
                    Tùy chỉnh hồ sơ cá nhân để thể hiện phong cách riêng của bạn.
                    Bạn có thể cập nhật ảnh đại diện, thay đổi biểu ngữ hoặc viết lời giới thiệu bản thân.
                    Mọi chỉnh sửa sẽ được cập nhật tức thì và hiển thị trực tiếp trên trang cá nhân của bạn.
                </div>
                <div className="text-lg gap-2 hidden lg:flex">
                    <InfoIcon/>Thông tin cá nhân
                </div>
                <div className="lg:flex justify-center items-start gap-20 mt-5">
                    <div className="lg:p-0 lg:px-4 lg:w-[30rem]">
                        <div className="lg:hidden w-full h-full mb-4">
                            <div
                                className="shadow border rounded-lg overflow-hidden w-full">
                                <div className="relative h-[9rem]">
                                    <div className="relative h-[6rem] w-full" style={{
                                        backgroundColor: bannerType === "color" ? bannerContent : undefined,
                                    }}>
                                        <img src={bannerType === "image" ? bannerContent : undefined}
                                             className={`${bannerType === "color" ? "hidden" : ""} object-cover w-full h-full`}/>
                                    </div>
                                    <div
                                        className="absolute top-12 left-4 w-[5.5rem] h-[5.5rem] me-3 border-[4px] border-gray-300 rounded-[60%]">
                                        <img src={avatar || undefined}
                                             className="object-cover rounded-[60%] p-1 w-full h-full"/>
                                    </div>
                                </div>
                                <div className="px-4 pb-4">
                                    <p className="font-semibold w-full break-all">{displayName}</p>
                                    <p className="text-sm w-full break-all">{user.username}</p>
                                    <p className="mt-4 w-full break-all">{description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 w-full">
                            <p className="pb-2 font-semibold">Tên hiển thị</p>
                            <input type="text" className="p-2 w-full rounded-lg border"
                                   placeholder="Tên hiển thị" value={displayName} maxLength={50}
                                   onChange={(e) => dispatch(setDisplayNameEditUserForm(e.target.value))}/>
                        </div>
                        <hr/>
                        <div className="my-4">
                            <p className="pb-2 font-semibold">Ảnh đại diện</p>
                            <input id="change-avatar" type="file" accept="image/*" className="hidden"
                                   onChange={handleChangeAvatar}/>
                            <label htmlFor="change-avatar" className="h-[2.5rem] cursor-pointer rounded-lg 
                        border border-[2px] text-indigo-800 border-indigo-500 w-[10rem] px-2 hover:bg-indigo-100/40 dark:border-gray-500/40 dark:text-white
                        flex gap-2 items-center">Đổi ảnh đại diện<PenTool
                                className="h-[1rem] w-[1rem]"/></label>
                        </div>
                        <hr/>
                        <div className="my-4 w-full">
                            <p className="pb-2 font-semibold">Biểu ngữ</p>
                            <button className="h-[2.5rem] cursor-pointer rounded-lg 
                        border border-[2px] text-indigo-800 border-indigo-500 px-2 hover:bg-indigo-100/40 dark:border-gray-500/40 dark:text-white
                        flex gap-2 items-center"
                                    onClick={() => dispatch(setOpenChangeBanner(true))}>Đổi biểu ngữ<PenTool
                                className="h-[1rem] w-[1rem]"/></button>
                        </div>
                        <hr/>
                        <div className="my-4">
                            <p className="pb-2 font-semibold">Giới thiệu</p>
                            <textarea className="p-2 w-full rounded-lg resize-none border text-gap"
                                      placeholder="Mô tả" maxLength={100} rows={5} value={description}
                                      onChange={(e) => dispatch(setDescriptionEditUserForm(e.target.value))}/>
                        </div>
                    </div>
                    <div className="sticky top-5 self-start">
                        <div className="hidden lg:block w-90 h-full">
                            <p className="pb-2 font-semibold">Xem trước</p>
                            <div
                                className="shadow border rounded-lg overflow-hidden w-full">
                                <div className="relative h-[9rem]">
                                    <div className="relative h-[6rem] w-full" style={{
                                        backgroundColor: bannerType === "color" ? bannerContent : undefined,
                                    }}>
                                        <img src={bannerType === "image" ? bannerContent : undefined}
                                             className={`${bannerType === "color" ? "hidden" : ""} object-cover w-full h-full`}/>
                                    </div>
                                    <div
                                        className="absolute top-12 left-4 w-[5.5rem] h-[5.5rem] me-3 border-[4px] border-gray-300 rounded-[60%]">
                                        <img src={avatar || undefined}
                                             className="object-cover rounded-[60%] p-1 w-full h-full"/>
                                    </div>
                                </div>
                                <div className="px-4 pb-4">
                                    <p className="font-semibold w-full break-all">{displayName}</p>
                                    <p className="text-sm w-full break-all">{user.username}</p>
                                    <p className="mt-4 w-full break-all whitespace-pre-line break-words">{description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:ps-0 ps-4 flex gap-2 my-4">
                            <button className={`h-[2.5rem] cursor-pointer p-2 rounded-lg 
                        bg-green-600 text-white
                        hover:bg-green-500 flex gap-2 items-center ${isUpdate && "bg-green-400"}`} disabled={isUpdate}
                                    onClick={submitEditUserForm}>{isUpdate ? "Đang cập nhật" : "Lưu cập nhật"}<PenLine
                                className="h-[1rem] w-[1rem]"/></button>
                            <button className="h-[2.5rem] cursor-pointer p-2 rounded-lg dark:bg-neutral-700/40 dark:hover:text-neutral-300
                        bg-gray-100 hover:bg-gray-100/50 hover:text-neutral-500 flex gap-2 items-center"
                                    onClick={() => dispatch(needRefreshEditUserForm())}>Đặt lại
                            </button>
                        </div>
                    </div>
                </div>
                <div className="pb-15">
                    <div className=" py-8 border-indigo-300 mt-4 rounded-xl w-full">
                        <div className="text-lg flex gap-2">
                            <SettingsIcon/> Cài đặt tài khoản
                        </div>
                        <div className="lg:px-[9rem] px-[1rem] items-between">
                            <div className="lg:flex gap-4 mb-4">
                                <p className="lg:py-8 py-4 w-full lg:w-[10rem] font-semibold">Đổi mật khẩu</p>
                                <div className="lg:mt-8 mb-4">
                                    <div className="flex justify-between gap-2 items-center px-4 w-50 h-[2.5rem] cursor-pointer rounded-lg 
                        border border-[2px] text-indigo-800 border-indigo-500 hover:bg-indigo-100/40 dark:border-gray-500/40 dark:text-white"
                                         onClick={() => {
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
                                <p className="w-full lg:w-[10rem] pb-4 lg:pb-0 font-semibold">Vô hiệu hóa tài khoản</p>
                                <button className="h-[2.5rem] cursor-pointer rounded-lg 
                        border border-[2px] text-indigo-800 border-indigo-500 px-2 hover:bg-indigo-100/40 dark:border-gray-500/40 dark:text-white
                        flex gap-2 items-center">Vô hiệu hóa <LockKeyhole
                                    className="h-[1rem] w-[1rem]"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {openChangeBanner && (
                <div className="flex justify-center items-center fixed dark:bg-black/60 bg-black/40 z-200 inset-0"
                     onClick={() => dispatch(setOpenChangeBanner(false))}>
                    <div className="border bg-white dark:bg-gray-700 w-80 h-50 rounded-lg"
                         onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-3">
                            <p className="ps-1 font-semibold text-lg">Chọn một biểu ngữ</p>
                            <X className="w-8 h-8 p-1 hover:bg-neutral-300/50 rounded cursor-pointer"
                               onClick={() => dispatch(setOpenChangeBanner(false))}/>
                        </div>
                        <div className="flex justify-center gap-18">
                            <div className="text-center cursor-pointer"
                                 onClick={() => dispatch(setChooseBannerType("color"))}>
                                <p className={`${chooseBannerType === "color" && "font-semibold"} px-4`}>Màu sắc</p>
                                <div
                                    className={`transform transition-transform duration-300 ease-in-out ${chooseBannerType === "color" ? "scale-x-100" : "scale-x-0"} w-full h-0.5 border border-indigo-400 shadow shadow-indigo-300 
                                        rounded-lg bg-indigo-400`}></div>
                            </div>
                            <div className="text-center cursor-pointer"
                                 onClick={() => dispatch(setChooseBannerType("image"))}>
                                <p className={`${chooseBannerType === "image" && "font-semibold"} px-4`}>Hình ảnh</p>
                                <div
                                    className={`transform transition-transform duration-300 ease-in-out ${chooseBannerType === "image" ? "scale-x-100" : "scale-x-0"} w-full h-0.5 border border-indigo-400 shadow shadow-indigo-300 
                                        rounded-lg bg-indigo-400`}></div>
                            </div>
                        </div>
                        <div className="w-full text-center p-5">
                            {chooseBannerType === "color" ? (
                                    <input type="color" value={bannerType === "color" ? bannerContent : "#6366f1"}
                                           className="cursor-pointer w-30 h-15"
                                           onChange={(e) => dispatch(setBannerEditUserForm({
                                               type: "color", content: e.target.value,
                                           }))}/>
                                ) :
                                (
                                    <div>
                                        <label htmlFor="choose-banner">
                                            <ImagePlus className="border bg-neutral-300 text-neutral-600 hover:bg-neutral-200 cursor-pointer mx-auto rounded-lg 
                                    w-30 h-15 p-3.5 hover:text-neutral-600/40 hover:scale-x-110 hover:scale-y-110"/>
                                        </label>
                                        <input id="choose-banner" type="file" className="hidden" accept="image/*"
                                               onChange={handleChangeBannerImage}/>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}