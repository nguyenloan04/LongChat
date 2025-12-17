import type { ReduxState } from "@/constants/ReduxState"
import { useDispatch, useSelector } from "react-redux"
import { resetAuthForm, setAuthFormValue, type AuthFormSlice } from "@/redux/slices/authSlice"
import { useEffect } from "react"
import { validateForm } from "@/services/authService"
import { useNavigate } from "react-router-dom"

export default function RegisterComponent() {
    const dispatcher = useDispatch()
    const currentForm = useSelector((state: ReduxState) => state.authForm)
    const navigate = useNavigate()

    const handleForm = () => {
        const validateFormResult = validateForm(currentForm)
        //Check API here
        //FIXME: Complete this
        if (validateFormResult) { }
    }

    const handleInputChange = <K extends keyof AuthFormSlice>(key: K, value: AuthFormSlice[K]) => {
        dispatcher(setAuthFormValue({
            key: key,
            value: value
        }))
    }

    useEffect(() => {
        dispatcher(resetAuthForm())
    }, [])

    return (
        <div className="flex flex-col items-center relative w-screen h-screen">
            <div className="w-100 h-full flex justify-center p-8 bg-white dark:bg-gray-900">
                <div>
                    <div className="text-center mb-8">
                        <h4 className="text-2xl font-semibold mb-1">Đăng ký</h4>
                        <p>Đăng ký tài khoản để tham gia cùng chúng tôi</p>
                    </div>
                    <div className="w-full">
                        <div className="mb-5">
                            <p className="font-semibold mb-1 text-sm pb-1">Tên người dùng</p>
                            <input
                                className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                                type="email" name="" id="" placeholder="Tên người dùng của bạn"
                                onChange={(e) => handleInputChange("username", e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <p className="font-semibold text-sm pb-1">Mật khẩu</p>
                            <input
                                className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                                type="password" name="" id="" placeholder="Mật khẩu của bạn"
                                onChange={(e) => handleInputChange("password", e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <p className="font-semibold text-sm pb-1">Nhập lại mật khẩu</p>
                            <input
                                className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                                type="password" name="" id="" placeholder="Nhập lại mật khâu"
                                onChange={(e) => handleInputChange("validatePassword", e.target.value)}
                            />
                        </div>
                    </div>


                    <button
                        className="cursor-pointer mt-4 bg-blue-900 hover:bg-blue-800 text-white p-2 rounded-md w-full"
                        onClick={handleForm}
                    >
                        Đăng ký
                    </button>
                    <div className="flex gap-3 items-start mt-5 text-center">
                        <p className="m-0 p-0 text-sm text-neutral-700 dark:text-neutral-400">
                            Khi tạo tài khoản, bạn đã đồng ý với <span className="underline hover:text-gray-500 cursor-pointer" onClick={() => navigate("/terms-of-service")}>Điều khoản dịch vụ</span> và <span className="underline hover:text-gray-500 cursor-pointer" onClick={() => navigate("/privacy-policy")}>Chính sách quyền riêng tư</span> của chúng tôi.
                        </p>
                    </div>

                </div>
            </div>

            <div className="mb-5">
                <p className="text-center">Đã có tài khoản? <span onClick={() => navigate('/login')} className="underline hover:text-gray-500 cursor-pointer">Đăng nhập</span>
                </p>
            </div>
        </div>
    )
}