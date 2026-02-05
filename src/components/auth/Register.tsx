import type { ReduxState } from "@/constants/ReduxState"
import { useDispatch, useSelector } from "react-redux"
import { resetAuthForm, setAuthFormValue, type AuthFormSlice } from "@/redux/slices/authSlice"
import { useEffect, useState } from "react"
import { validateForm } from "@/services/authService"
import { useNavigate } from "react-router-dom"
import { WebSocketEvent } from "@/socket/types/WebSoketMessage"
import { FormType } from "@/constants/AuthForm"
import { WebsocketInstance } from "@/socket/WebsocketInstance"
import { ConnectionLoading } from "../common/ConnectionLoading"

//Handle loading when connect() is not completed

export default function RegisterComponent() {
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

    const handleForm = () => {
        const validateFormResult = validateForm(currentForm, FormType.REGISTER)
        if (validateFormResult.result) {
            isLoading(true)
            wsInstance.send(WebSocketEvent.REGISTER, {
                user: currentForm.username,
                pass: currentForm.password
            })
        }
        else {
            setMessage(validateFormResult.message)
        }
    }

    const handleInputChange = <K extends keyof AuthFormSlice>(key: K, value: AuthFormSlice[K]) => {
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
        const unsubscribe = wsInstance.subscribe(WebSocketEvent.REGISTER, (response) => {
            if (response.status === "success") {
                //Config upload default avatar and default banner here
                //Navigate back to login
                setMessage("Đăng ký thành công. Đang chuyển về trang đăng nhập")
                setTimeout(() => {
                    navigate("/login")
                }, 500)
            }
            else {
                isLoading(false)
                setMessage("Tên người dùng này đã đăng ký")
                console.log(response.mes)
                //Send a message here
            }
        })

        return () => unsubscribe()
    }, [navigate, wsInstance])

    return (
        <div className="flex dark:bg-gray-800 dark:text-white flex-col items-center relative w-screen h-screen">
            <div className="w-100 h-full flex justify-center p-8 bg-white dark:bg-gray-900">
                {pageLoading ?
                    <div>
                        <div className="text-center mb-8 flex flex-col items-center">
                            <div className="mb-2 text-white flex justify-center items-center bg-appchat-bluesky text-2xl w-14 h-14 rounded-full">
                                <i className="fa-solid fa-comment"></i>
                            </div>
                            <h4 className="text-2xl font-semibold mb-1">Đăng ký</h4>
                            <p>Đăng ký tài khoản để tham gia cùng chúng tôi</p>
                        </div>
                        <div className="w-full">
                            <div className="mb-5">
                                <p className="font-semibold mb-1 text-sm pb-1">Tên người dùng</p>
                                <input
                                    className="w-full border border-gray-400 p-1 py-2 ps-3 rounded-md"
                                    type="text" name="" id="" placeholder="Tên người dùng của bạn"
                                    onChange={(e) => handleInputChange("username", e.target.value)}
                                />
                            </div>
                            <div className="mb-5">
                                <p className="font-semibold text-sm pb-1">Mật khẩu</p>
                                <input
                                    className="w-full border border-gray-400 p-1 py-2 ps-3 rounded-md"
                                    type="password" name="" id="" placeholder="Mật khẩu của bạn"
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                />
                            </div>
                            <div className="mb-5">
                                <p className="font-semibold text-sm pb-1">Nhập lại mật khẩu</p>
                                <input
                                    className="w-full border border-gray-400 p-1 py-2 ps-3 rounded-md"
                                    type="password" name="" id="" placeholder="Nhập lại mật khẩu"
                                    onChange={(e) => handleInputChange("validatePassword", e.target.value)}
                                />
                            </div>
                            <p className="text-center text-red-500 text-sm">{message}</p>
                        </div>


                        <button
                            className="cursor-pointer mt-4 bg-appchat-bluesky hover:bg-blue-800/80 text-white p-2 rounded-md w-full disabled:bg-blue-900/70"
                            disabled={loading}
                            onClick={handleForm}
                        >
                            {loading ? "Đang đăng ký" : "Đăng ký"}
                        </button>
                        <div className="flex gap-3 items-start mt-5 text-center">
                            <p className="m-0 p-0 text-sm text-neutral-700 dark:text-neutral-400">
                                Khi tạo tài khoản, bạn đã đồng ý với <span className="underline hover:text-gray-500 cursor-pointer" onClick={() => navigate("/terms-of-service")}>Điều khoản dịch vụ</span> và <span className="underline hover:text-gray-500 cursor-pointer" onClick={() => navigate("/privacy-policy")}>Chính sách quyền riêng tư</span> của chúng tôi.
                            </p>
                        </div>

                    </div>
                    :
                    <ConnectionLoading />
                }

            </div>

            <div className="mb-5">
                <p className="text-center">Đã có tài khoản? <span onClick={() => navigate('/login')} className="underline hover:text-gray-500 cursor-pointer">Đăng nhập</span>
                </p>
            </div>
        </div>
    )
}