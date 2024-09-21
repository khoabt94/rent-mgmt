import { COOKIE_KEY } from '@/constants/cookie-key';
import { Api } from '@/interfaces'
import { useAuthStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import {
    login as loginApi,
    signup as signupApi,
    createResetPasswordToken as createResetPasswordTokenApi,
    resetPassword as resetPasswordApi
} from '@/services'
import Cookies from 'js-cookie';
import { siteConfig } from '@/configs/site';
import { useToast } from './use-toast';
import { useQueryClient } from '@tanstack/react-query';



export function useAuthActions() {
    const { toastError, toastSuccess } = useToast()
    const navigate = useNavigate();
    const { clearUser, getUser } = useAuthStore()
    const queryClient = useQueryClient()

    const login = async (payload: Api.AuthApi.LoginPayload) => {
        try {
            const res = await loginApi(payload)
            Cookies.set(COOKIE_KEY.ACCESS_TOKEN, res.access_token)
            toastSuccess("Đăng nhập thành công")
            getUser()
            navigate(siteConfig.paths.home())
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toastError(error.message)
        }
    }

    const signUp = async (payload: Api.AuthApi.SignUpPayload) => {
        try {
            await signupApi(payload)
            // setUser(res.user)
            // Cookies.set(COOKIE_KEY.ACCESS_TOKEN, res.access_token)
            navigate(siteConfig.paths.login())
            toastSuccess("Đăng ký thành công, Vui lòng đăng nhập")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toastError(error.message)
        }
    }

    const logout = async () => {
        clearUser()
        queryClient.clear()
        Cookies.remove(COOKIE_KEY.ACCESS_TOKEN)
        navigate(siteConfig.paths.login())
        toastSuccess("Đăng xuất thành công")
    }

    const createResetPasswordToken = async (payload: Api.AuthApi.CreateResetPasswordPayload) => {
        try {
            await createResetPasswordTokenApi(payload)
            toastSuccess("You will receive an email with reset password instruction")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toastError(error.message)
        }
    }

    const resetPassword = async (resetTokenId: string, payload: Api.AuthApi.ResetPasswordPayload) => {
        try {
            await resetPasswordApi(resetTokenId, payload)
            navigate(siteConfig.paths.login())
            toastSuccess("Reset password successfully. Please login with your new password")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toastError(error.message)
        }
    }

    return { login, signUp, logout, createResetPasswordToken, resetPassword }
}
