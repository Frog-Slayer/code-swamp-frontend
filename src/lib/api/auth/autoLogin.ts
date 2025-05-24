import { store } from "@/app/store/store"
import { refreshAccessToken } from "./refresh"
import { logout } from "./logout"
import { setAccessTokenAction, setAuthLoadingAction } from "@/features/auth/store/authSlice"
import { setUser } from "@/features/user/store/userSlice"

let hasAttemptedAutoLogin = false

export const attemptAutoLogin = async () => {
    const accessToken = store.getState().auth.accessToken

    if (accessToken) {
        store.dispatch(setAuthLoadingAction(false))
        return;
    }

    if (hasAttemptedAutoLogin) return
    hasAttemptedAutoLogin = true

    try {
        const res = await refreshAccessToken()

        store.dispatch(setAccessTokenAction(res.accessToken))
        store.dispatch(setUser({
            name: res.userProfile.nickname,
            profileImage: res.userProfile.profileImage
        }))
    } catch (err) {
        logout()
    } finally {
        store.dispatch(setAuthLoadingAction(false))
    }
}
