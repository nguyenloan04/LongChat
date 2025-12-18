// import type { ReduxState } from "@/constants/ReduxState"
import { useDispatch } from "react-redux"
import { resetAuthForm, setAuthFormValue, type AuthFormSlice } from "@/redux/slices/authSlice"
import { useEffect } from "react"
// import { validateForm } from "@/services/authService"

/**
 * @deprecated 
 */
export default function ResetPasswordComponent() {
    const dispatcher = useDispatch()
    // const currentForm = useSelector((state: ReduxState) => state.authForm)

    const handleForm = () => {
        // const validateFormResult = validateForm(currentForm)
        // //Check API here
        // //FIXME: Complete this
        // if (validateFormResult) { }
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
                        <h4 className="text-2xl font-semibold mb-1">Reset mật khẩu</h4>
                        <p>Nhập mật khẩu mới cho tài khoản của bạn</p>
                    </div>
                    <div className="w-full">
                        <div className="mb-5">
                            <p className="font-semibold">Mật khẩu mới</p>
                            <input
                                className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                                type="password" name="" id="" placeholder=""
                                onChange={(e) => handleInputChange("password", e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <p className="font-semibold">Nhập lại mật khẩu mới</p>
                            <input
                                className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                                type="password" name="" id="" placeholder=""
                                onChange={(e) => handleInputChange("validatePassword", e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        className="cursor-pointer mt-4 bg-blue-900 hover:bg-blue-800 text-white p-2 rounded-md w-full"
                        onClick={handleForm}
                    >
                        Xác nhận
                    </button>

                </div>
            </div>
        </div>
    )
}