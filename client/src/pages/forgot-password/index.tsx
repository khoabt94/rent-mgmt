import { siteConfig } from "@/configs/site";
import { ForgotPasswordForm } from "@/lib/forgot-password";
import { Link } from "react-router-dom";

export function ForgotPasswordPage() {
    return (
        <div className="px-4 pt-10 justify-between flex flex-col gap-y-5 text-center">
            <div className="mb-3">
                <h3 className="text-xl font-bold">Quên mật khẩu</h3>
                <p className="text-base">Vui lòng nhâp địa chỉ email để nhận hướng dẫn</p>
            </div>
            <ForgotPasswordForm />

            <Link to={siteConfig.paths.login()} className="">
                Nếu bạn đã nhớ mật khẩu, vui lòng đăng nhập!
            </Link>
        </div>
    )
}
