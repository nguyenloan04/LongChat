// import type { ReduxState } from "@/constants/ReduxState"
import { useDispatch } from "react-redux"
import { resetAuthForm, setAuthFormValue } from "@/redux/slices/authSlice"
import { useEffect } from "react"
// import { validateForm } from "@/services/authService"
// import { useNavigate } from "react-router-dom"

/**
 * @deprecated
 */
export default function ForgetPasswordComponent() {
    const dispatcher = useDispatch()
    // const currentForm = useSelector((state: ReduxState) => state.authForm)
    // const navigate = useNavigate()

    const handleForm = () => {
        // //Check API here
        // const validateFormResult = validateForm(currentForm)
        // //FIXME: Complete this
        // if (validateFormResult) { }
        // //Temp line for testing
        // navigate('/reset-password')
    }

    const handleInputChange = (key: 'username' | 'password', value: string) => {
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
                        <h4 className="text-2xl font-semibold mb-1">Quên mật khẩu</h4>
                        <p>Nhập tên tài khoản đã đăng ký cho tài khoản của bạn để khôi phục mật khẩu</p>
                    </div>
                    <div className="w-full">
                        <p className="font-semibold mb-1">Tên tài khoản</p>
                        <input
                            className="w-full border border-gray-400 p-1 ps-3 rounded-md"
                            type="text" name="" id="" placeholder=""
                            onChange={(e) => handleInputChange("username", e.target.value)}
                        />
                    </div>
                    <button
                        className="cursor-pointer mt-4 bg-blue-900 hover:bg-blue-800 text-white p-2 rounded-md w-full"
                        onClick={handleForm}
                    >
                        Gửi email xác thực
                    </button>
                </div>
            </div>
        </div>
    )
}