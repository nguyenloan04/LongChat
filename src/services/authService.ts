import { FormType } from "@/constants/AuthForm";
import type { AuthFormSlice } from "@/redux/slices/authSlice";

export function validateForm(formData: AuthFormSlice, formType: FormType): { result: boolean, message: string } {
    const { username, password, validatePassword } = formData

    const requiredFields = formType === FormType.REGISTER
        ? [username, password, validatePassword]
        : [username, password];

    if (requiredFields.some(field => !field?.trim())) {
        return { result: false, message: "Vui lòng nhập đầy đủ thông tin" };
    }

    if (formType === FormType.REGISTER && password !== validatePassword) {
        return { result: false, message: "Xác nhận mật khẩu không khớp" };
    }

    return {
        result: true,
        message: ""
    }
}