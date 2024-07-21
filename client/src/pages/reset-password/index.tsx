import { ResetPasswordForm } from "@/lib/reset-password";


//resetTokenId
export function ResetPasswordPage() {
    return (
        <div className="px-4 pt-10 justify-between flex flex-col gap-y-5 text-center">
            <div className="mb-3">
                <h3 className="text-xl font-bold">Khởi tạo lại mật khẩu</h3>
                <p className="text-base">Vui lòng nhập mật khẩu mới</p>
            </div>
            <ResetPasswordForm />
        </div>
    )
}
