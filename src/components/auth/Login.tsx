import type { ReduxState } from "@/constants/ReduxState"
import { useDispatch, useSelector } from "react-redux"
import { resetAuthForm, setAuthFormValue } from "@/redux/slices/authSlice"
import { useEffect } from "react"
import { validateForm } from "@/services/authService"
import { useNavigate } from "react-router-dom"

export default function LoginComponent() {
    const dispatcher = useDispatch()
    const currentForm = useSelector((state: ReduxState) => state.authForm)
    const navigate = useNavigate()

    const handleForm = () => {
        const validateFormResult = validateForm(currentForm)
        //Check API here
        //FIXME: Complete this
        if (validateFormResult) { }
    }

    const handleInputChange = (key: 'email' | 'password', value: string) => {
        dispatcher(setAuthFormValue({
            key: key,
            value: value
        }))
    }

    useEffect(() => {
        dispatcher(resetAuthForm())
    }, [])

    return (
        <div className="flex justify-center relative" style={{ width: "100%", height: "100vh" }}>
            <div className="w-100 h-full flex justify-center p-8 bg-white dark:bg-gray-900">
                <div>
                    <div className="text-center mb-8">
                        <h4 className="text-2xl font-semibold mb-1">Đăng nhập</h4>
                        <p>Đăng nhập tài khoản để trải nghiệm cùng chúng tôi</p>
                    </div>
                    <div className="w-full">
                        <div className="mb-5">
                            <p className="font-semibold mb-1 text-sm">Email</p>
                            <input
                                className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                                type="email" name="" id="" placeholder="email@example.com"
                                onChange={(e) => handleInputChange("email", e.target.value)}
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
                    </div>
                    <button
                        className="cursor-pointer mt-4 bg-blue-900 hover:bg-blue-800 text-white p-2 rounded-md w-full"
                        onClick={handleForm}
                    >
                        Đăng nhập
                    </button>
                    <div className="my-4 flex gap-2 items-center">
                        <div className="flex-1 bg-gray-200 h-0.5 rounded"></div>
                        <p>Hoặc đăng nhập với</p>
                        <div className="flex-1 bg-gray-200 h-0.5 rounded"></div>
                    </div>
                    <div className="flex gap-10">
                        <button className="flex justify-center flex-1 border hover:bg-gray-200 border-gray-300 px-3 py-2 rounded-xl bg-gray-100">
                            <i className="fa-brands fa-google"></i>
                        </button>
                        <button className="flex justify-center flex-1 border hover:bg-gray-200 border-gray-300 px-3 py-2 rounded-xl bg-gray-100">
                            <i className="fa-brands fa-facebook-f"></i>
                        </button>
                    </div>
                    <div className="mt-5">
                        <p className="text-center">Chưa có tài khoản? <span onClick={() => navigate('/register')} className="underline hover:text-gray-500 cursor-pointer">Đăng ký</span>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}