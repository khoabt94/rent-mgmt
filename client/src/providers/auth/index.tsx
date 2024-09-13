import AppLoading from "@/components/ui/app-loading"
import { useAuthStore } from "@/store"
import { ReactNode, useEffect } from "react"


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { getUser, isFetchingUser } = useAuthStore()



    useEffect(() => {
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isFetchingUser) return <AppLoading />

    return children
}
