import type { ReduxState } from "@/constants/ReduxState"
import { useDispatch, useSelector } from "react-redux"
import { resetAuthForm, setAuthFormValue } from "@/redux/slices/authSlice"
import { useEffect } from "react"
import { FormType } from "@/constants/AuthForm"

export default function LoginComponent() {
    const dispatcher = useDispatch()
    const currentForm = useSelector((state: ReduxState) => state.authForm)

    const changeForm = (type: FormType) => {
        dispatcher(setAuthFormValue({
            key: "currentForm",
            value: type
        }))
    }

    const handleLogin = () => {
        const email = currentForm.email
        const password = currentForm.password
        //Check API here
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
        <div className="flex justify-center items-center h-full">
            <div className="w-100 bg-white p-8 rounded-2xl">
                <div className="text-center mb-8">
                    <h4 className="text-2xl font-semibold mb-1">Đăng nhập</h4>
                    <p>Đăng nhập tài khoản để trải nghiệm cùng chúng tôi</p>
                </div>
                <div className="w-full">
                    <div className="mb-5">
                        <p className="font-semibold mb-1">Email</p>
                        <input
                            className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                            type="email" name="" id="" placeholder="email@example.com"
                            onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <div className="flex justify-between mb-1">
                            <p className="font-semibold">Mật khẩu</p>
                            <p className="hover:text-gray-500 cursor-pointer">Quên mật khẩu?</p>
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
                    onClick={handleLogin}
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
                    <p className="text-center">Chưa có tài khoản? 
                        <span
                            onClick={() => changeForm(FormType.REGISTER)}
                            className="underline hover:text-gray-500 cursor-pointer"
                        >
                            Đăng ký
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}