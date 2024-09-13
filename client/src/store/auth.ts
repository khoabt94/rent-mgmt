import { COOKIE_KEY } from '@/constants/cookie-key';
import { User } from '@/interfaces';
import { getMyInfo } from '@/services';
import Cookies from 'js-cookie';
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
            throw new Error('Phiên đăng nhập hết hạn')
        }
        try {
            const res = await getMyInfo();
            set({ user: res.user })
        } catch (error) {
            ///empty
        } finally {
            set({ isFetchingUser: false })
        }
    }
}));
