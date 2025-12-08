import type { ReduxState } from "@/constants/ReduxState"
import { useDispatch, useSelector } from "react-redux"
import { resetAuthForm, setAuthFormValue, type AuthFormSlice } from "@/redux/slices/authSlice"
import { useEffect } from "react"
import { FormType } from "@/constants/AuthForm"
import { validateForm } from "@/services/authService"

export default function RegisterComponent() {
    const dispatcher = useDispatch()
    const currentForm = useSelector((state: ReduxState) => state.authForm)

    const changeForm = (type: FormType) => {
        dispatcher(setAuthFormValue({
            key: "currentForm",
            value: type
        }))
    }

    const handleLogin = () => {
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
        <div className="flex justify-center items-center h-full">
            <div className="w-100 bg-white p-8 rounded-2xl">
                <div className="text-center mb-8">
                    <h4 className="text-2xl font-semibold mb-1">Đăng ký</h4>
                    <p>Đăng ký tài khoản để tham gia cùng chúng tôi</p>
                </div>
                <div className="w-full">
                    <div className="mb-5">
                        <p className="font-semibold mb-1">Tên người dùng</p>
                        <input
                            className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                            type="email" name="" id="" placeholder="example"
                            onChange={(e) => handleInputChange("username", e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <p className="font-semibold mb-1">Email</p>
                        <input
                            className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                            type="email" name="" id="" placeholder="email@example.com"
                            onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <p className="font-semibold">Mật khẩu</p>
                        <input
                            className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                            type="password" name="" id="" placeholder=""
                            onChange={(e) => handleInputChange("password", e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <p className="font-semibold">Nhập lại mật khẩu</p>
                        <input
                            className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                            type="password" name="" id="" placeholder=""
                            onChange={(e) => handleInputChange("validatePassword", e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <input
                        type="checkbox" name="" id=""
                        className="mt-2 p-0"
                        onChange={(e) => handleInputChange("isCheckboxClicked", e.target.checked)}
                    />
                    <p className="m-0 p-0">
                        Bằng cách click vào, bạn đã đồng ý với <span className="underline hover:text-gray-500 cursor-pointer" onClick={() => window.location.href = "/terms-of-service"}>Điều khoản dịch vụ</span> và <span className="underline hover:text-gray-500 cursor-pointer" onClick={() => window.location.href = "/privacy-policy"}>Chính sách quyền riêng tư</span> của chúng tôi.
                    </p>
                </div>

                <button
                    className="cursor-pointer mt-4 bg-blue-900 hover:bg-blue-800 text-white p-2 rounded-md w-full"
                    onClick={handleLogin}
                >
                    Đăng ký
                </button>
                <div className="mt-5">
                    <p className="text-center">Đã có tài khoản? <span onClick={() => changeForm(FormType.LOGIN)} className="underline hover:text-gray-500 cursor-pointer">Đăng nhập</span>
                    </p>
                </div>
            </div>
        </div >
    )
}