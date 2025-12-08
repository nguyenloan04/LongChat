import { FormType } from "@/constants/AuthForm";
import type { AuthFormSlice } from "@/redux/slices/authSlice";

export function validateForm(formData: AuthFormSlice): { result: boolean, message: string } {
    const { username, email, password, validatePassword } = formData
    //General validate
    if (!username || !email) return {
        result: false,
        message: "" //FIXME: Add message
    }

    if (password.length < 8 || password.length > 32) return {
        result: false,
        message: "" //FIXME: Add message
    }

    const emailRegex = new RegExp(/^[^@]+@[^@]+\.[^@]+$/)
    const type = formData.currentForm

    switch (type) {
        case FormType.LOGIN: {
            return {
                result: emailRegex.test(email),
                message: ""
            }
        }
        case FormType.REGISTER: {
            //Check email existance
            const doesEmailValid = false    //FIXME: Implement method for fiding exist email
            return {
                result: validatePassword === password && (emailRegex.test(email) && doesEmailValid),
                message: "" //FIXME: Add message
            }
        }
        case FormType.FORGET_PASSWORD: {
            return {
                result: emailRegex.test(email),
                message: "" //FIXME: Add message
            }
        }
        case FormType.RESET_PASSWORD: {
            return {
                result: validatePassword === password,
                message: "" //FIXME: Add message
            }
        }
        default: {
            return {
                result: false,
                message: ""
            }
        }
    }
}