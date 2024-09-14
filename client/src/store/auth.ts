import { siteConfig } from '@/configs/site';
import { COOKIE_KEY } from '@/constants/cookie-key';
import { User } from '@/interfaces';
import { getMyInfo } from '@/services';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';
import { create } from 'zustand';

type IAuthStore = {
    user: User.Detail | null
    isFetchingUser: boolean;
    setUser: (_user: User.Detail) => void;
    setIsFetchingUser: (_flag: boolean) => void;
    clearUser: () => void;
    getUser: () => void;
};

export const useAuthStore = create<IAuthStore>((set) => ({
    user: null,
    isFetchingUser: true,
    setIsFetchingUser: (isFetchingUser: boolean) => set({ isFetchingUser }),
    setUser: (user: User.Detail) => set({ user }),
    clearUser: () => set({ user: null }),
    getUser: async () => {
        const accessToken = Cookies.get(COOKIE_KEY.ACCESS_TOKEN)
        if (!accessToken) {
            redirect(siteConfig.paths.login())
        }
        try {
            const res = await getMyInfo();
            set({ user: res.user })
        } catch (error) {
            console.log(error);
        } finally {
            set({ isFetchingUser: false })
        }
    }
}));
