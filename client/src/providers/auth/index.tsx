import { useAuthStore } from "@/store"
import { ReactNode, useEffect } from "react"


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { refreshToken } = useAuthStore()



    useEffect(() => {
        refreshToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if (isFetchingUser) return <AppLoading />

    return children
}
