import type { ReduxState } from "@/constants/ReduxState"
import { useDispatch, useSelector } from "react-redux"
import { resetAuthForm, setAuthFormValue } from "@/redux/slices/authSlice"
import { useEffect, useState } from "react"
import { validateForm } from "@/services/authService"
import { useNavigate } from "react-router-dom"
import { WebsocketInstance } from "@/socket/WebsocketInstance"
import { WebSocketEvent } from "@/socket/types/WebSoketMessage"
import { FormType } from "@/constants/AuthForm"
import { ConnectionLoading } from "../common/ConnectionLoading"
import { authApi } from "@/api/auth"
import { setCurrentUser } from "@/redux/slices/userSlice"
import { AuthFooter } from "./Footer"

export default function LoginComponent() {
    const dispatcher = useDispatch()
    const currentForm = useSelector((state: ReduxState) => state.authForm)
    const socketState = useSelector((state: ReduxState) => state.socketState)
    const currentUser = useSelector((state: ReduxState) => state.currentUser)
    //Redux state
    const pageLoading = socketState.isConnected

    //Local state
    const [loading, isLoading] = useState(false)
    const [message, setMessage] = useState("")

    const navigate = useNavigate()
    const wsInstance = WebsocketInstance.getInstance()

    const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL

    const handleForm = () => {
        const validateFormResult = validateForm(currentForm, FormType.LOGIN)
        if (validateFormResult.result) {
            isLoading(true)
            wsInstance.send(WebSocketEvent.LOGIN, {
                user: currentForm.username,
                pass: currentForm.password
            })
        }
        else {
            setMessage(validateFormResult.message)
        }
    }

    const handleInputChange = (key: 'username' | 'password', value: string) => {
        dispatcher(setAuthFormValue({
            key: key,
            value: value
        }))
    }

    useEffect(() => {
        dispatcher(resetAuthForm())
        //Redirect to home page if logged in
        if (currentUser.user) navigate("/")
    }, [])


    useEffect(() => {
        const unsubscribe = wsInstance.subscribe(WebSocketEvent.LOGIN, async (response) => {
            if (response.status === "success") {
                const reloginCode = response.data.RE_LOGIN_CODE
                localStorage.setItem("RE_LOGIN_CODE", reloginCode)
                localStorage.setItem("username", currentForm.username)

                const description = await authApi.getDescription(currentForm.username).then(res => res.description)

                dispatcher(setCurrentUser({
                    username: currentForm.username,
                    description,
                    displayName: currentForm.username,
                    avatar: `${cloudinaryUrl}/avatar/${currentForm.username}`,
                    banner: {
                        content: `${cloudinaryUrl}/banner/${currentForm.username}`,
                        type: "image"
                    },
                }))

                setMessage("Đăng nhập thành công")
                setTimeout(() => {
                    navigate("/")
                }, 500)
            }
            else {
                isLoading(false)
                setMessage("Tên tài khoản hoặc mật khẩu sai")
                console.log(response.mes)
                //Send a message here
            }
        })

        return () => unsubscribe()
    }, [navigate, wsInstance])


    return (
        <div className="flex justify-between items-center flex-col relative" style={{ width: "100%", height: "100vh" }}>
            <div className="w-100 h-full flex justify-center p-8 bg-white dark:bg-gray-900">
                {pageLoading ?
                    <div>
                        <div className="text-center mb-8 flex flex-col items-center">
                            <div className="mb-2 text-white flex justify-center items-center bg-appchat-bluesky text-2xl w-14 h-14 rounded-full">
                                <i className="fa-solid fa-comment"></i>
                            </div>
                            <h4 className="text-2xl font-semibold mb-1">Đăng nhập</h4>
                            <p>Đăng nhập tài khoản để trải nghiệm cùng LongChat</p>
                        </div>
                        <div className="w-full">
                            <div className="mb-5">
                                <p className="font-semibold mb-1 text-sm">Tên người dùng</p>
                                <input
                                    className="w-full border border-gray-400 p-1 py-2 ps-3 rounded-md"
                                    type="text" name="" id="" placeholder=""
                                    onChange={(e) => handleInputChange("username", e.target.value)}
                                />
                            </div>
                            <div className="mb-5">
                                <div className="flex justify-between mb-1">
                                    <p className="font-semibold text-sm">Mật khẩu</p>
                                </div>
                                <input
                                    className="w-full border border-gray-400 p-1 py-2 ps-3 rounded-md"
                                    type="password" name="" id="" placeholder=""
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                />
                            </div>
                            <p className="text-center text-red-500 text-sm">{message}</p>
                        </div>
                        <button
                            className="cursor-pointer mt-4 bg-appchat-bluesky hover:bg-blue-800/80 text-white p-2 rounded-md w-full disabled:bg-blue-900/70"
                            disabled={loading}
                            onClick={handleForm}
                        >
                            {loading ? "Đang đăng nhập" : "Đăng nhập"}
                        </button>
                        <div className="mt-5">
                            <p className="text-center">Chưa có tài khoản? <span onClick={() => navigate('/register')} className="underline hover:text-gray-500 cursor-pointer">Đăng ký</span>
                            </p>
                        </div>
                    </div>
                    :
                    <ConnectionLoading />
                }
            </div>
            <AuthFooter />
        </div >
    )
}