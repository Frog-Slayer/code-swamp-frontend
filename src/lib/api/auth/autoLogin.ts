import { store } from "@/app/store/store"
import { useRefreshAccessToken } from "./refresh"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { useUser } from "@/features/user/hooks/useUser"
import { useLogout } from "./logout"

let hasAttemptedAutoLogin = false

export const useAutoLogin = () => {
    const refreshAccessToken = useRefreshAccessToken()
    const logout = useLogout()

    const getAccessToken = () => {
        return store.getState().auth.accessToken
    }

    const { setAccessToken, setAuthLoading} = useAuth()
    const { setUser } = useUser()

    const attemptAutoLogin = async () => {
        if (getAccessToken()) {
            setAuthLoading(false)
            return;
        }

        if (hasAttemptedAutoLogin) return
        hasAttemptedAutoLogin = true

        try {
            const res = await refreshAccessToken()

            setAccessToken(res.accessToken)
            setUser({
                name: res.userProfile.nickname,
                profileImage: res.userProfile.profileImage
            })
        } catch (err) {
            logout()
        } finally {
            setAuthLoading(false)
        }
    }

    return attemptAutoLogin
}
