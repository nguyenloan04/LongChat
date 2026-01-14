import type { ReduxState } from "@/constants/ReduxState"
import { useDispatch, useSelector } from "react-redux"
import { resetAuthForm, setAuthFormValue } from "@/redux/slices/authSlice"
import {useEffect, useRef, useState} from "react"
import { validateForm } from "@/services/authService"
import { useNavigate } from "react-router-dom"
import { WebsocketInstance } from "@/socket/WebsocketInstance"
import { WebSocketEvent } from "@/socket/types/WebSoketMessage"
import { FormType } from "@/constants/AuthForm"
import { ConnectionLoading } from "../common/ConnectionLoading"
import {setCurrentUser} from "@/redux/slices/userSlice.ts";

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
    // Save newest username
    const usernameRef = useRef(currentForm.username);
    useEffect(() => {
        usernameRef.current = currentForm.username;
    }, [currentForm.username]);

    const handleForm = () => {
        const validateFormResult = validateForm(currentForm, FormType.LOGIN)
        console.log(validateFormResult)
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
        if (currentUser.user) {
            // console.log("user", currentUser)
            navigate("/chat")
        }
    }, [])


    useEffect(() => {
        const unsubscribe = wsInstance.subscribe(WebSocketEvent.LOGIN, (response) => {
            if (response.status === "success") {
                const reloginCode = response.data.RE_LOGIN_CODE
                const username = usernameRef.current;
                // const username = currentForm.username
                localStorage.setItem("RE_LOGIN_CODE", reloginCode)
                localStorage.setItem("username", username)
                console.log("Saved Username: " ,username)
                console.log(reloginCode)
                // save state.currentUser
                dispatcher(setCurrentUser({
                    username: username,
                    avatar: `https://res.cloudinary.com/dcyo10lft/image/upload/${username}.jpg`,
                    displayName: username,
                    banner: { type: "color", content: "#6366f1" },
                    description: "",
                }));
                setMessage("Đăng nhập thành công")
                setTimeout(() => {
                    navigate("/chat")
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
    }, [navigate, wsInstance,dispatcher])


    return (
        <div className="flex justify-center relative" style={{ width: "100%", height: "100vh" }}>
            <div className="w-100 h-full flex justify-center p-8 bg-white dark:bg-gray-900">
                {pageLoading ?
                    <div>
                        <div className="text-center mb-8">
                            <h4 className="text-2xl font-semibold mb-1">Đăng nhập</h4>
                            <p>Đăng nhập tài khoản để trải nghiệm cùng chúng tôi</p>
                        </div>
                        <div className="w-full">
                            <div className="mb-5">
                                <p className="font-semibold mb-1 text-sm">Tên người dùng</p>
                                <input
                                    className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                                    type="text" name="" id="" placeholder=""
                                    onChange={(e) => handleInputChange("username", e.target.value)}
                                />
                            </div>
                            <div className="mb-5">
                                <div className="flex justify-between mb-1">
                                    <p className="font-semibold text-sm">Mật khẩu</p>
                                    <p className="hover:text-gray-500 cursor-pointer text-sm" onClick={() => navigate('/forget-password')}>Quên mật khẩu?</p>
                                </div>
                                <input
                                    className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                                    type="password" name="" id="" placeholder=""
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                />
                            </div>
                            <p className="text-center text-red-500">{message}</p>
                        </div>
                        <button
                            className="cursor-pointer mt-4 bg-blue-900 hover:bg-blue-800 text-white p-2 rounded-md w-full disabled:bg-blue-900/70"
                            disabled={loading}
                            onClick={handleForm}
                        >
                            {loading ? "Đang đăng nhập" : "Đăng nhập"}
                        </button>
                        <div className="my-4 flex gap-2 items-center">
                            <div className="flex-1 bg-gray-200 h-0.5 rounded"></div>
                            <p>Hoặc đăng nhập với</p>
                            <div className="flex-1 bg-gray-200 h-0.5 rounded"></div>
                        </div>
                        <div className="flex gap-10">
                            <button disabled={loading} className="flex justify-center flex-1 border hover:bg-gray-200 border-gray-300 px-3 py-2 rounded-xl bg-gray-100">
                                <i className="fa-brands fa-google"></i>
                            </button>
                            <button disabled={loading} className="flex justify-center flex-1 border hover:bg-gray-200 border-gray-300 px-3 py-2 rounded-xl bg-gray-100">
                                <i className="fa-brands fa-facebook-f"></i>
                            </button>
                        </div>
                        <div className="mt-5">
                            <p className="text-center">Chưa có tài khoản? <span onClick={() => navigate('/register')} className="underline hover:text-gray-500 cursor-pointer">Đăng ký</span>
                            </p>
                        </div>
                    </div>
                    :
                    <ConnectionLoading />
                }
            </div>
        </div >
    )
}