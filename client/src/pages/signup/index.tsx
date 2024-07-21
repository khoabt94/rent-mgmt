import { siteConfig } from "@/configs/site";
import { SignupForm } from "@/lib/signup";
import { Link } from "react-router-dom";

export function SignupPage() {
    return (
        <div className="px-4 pt-10 justify-between flex flex-col gap-y-5 text-center">
            <div className="mb-3">
                <h3 className="text-xl font-bold">Đăng ký</h3>
                <p className="text-base">để quản lý khu nhà của bạn</p>
            </div>
            <SignupForm />
            <Link to={siteConfig.paths.login()} className="">
                Nếu bạn đã có tài khoản, vui lòng đăng nhập!
            </Link>
        </div>
    )
}
