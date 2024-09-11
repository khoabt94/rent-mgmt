import { siteConfig } from "@/configs/site";
import { LoginForm } from "@/lib/login";
import { Link } from "react-router-dom";

export function LoginPage() {
    return (
        <div className="px-4 pt-10 justify-between flex flex-col gap-y-5 text-center">
            <div className="mb-3">
                <h3 className="text-xl font-bold">Đăng nhập</h3>
                <p className="text-base">để quản lý khu nhà của bạn</p>
            </div>
            <LoginForm />

            <Link to={siteConfig.paths.signup()} className="">
                Nếu chưa có tài khoản, vui lòng đăng ký!
            </Link>
        </div>
    )
}
