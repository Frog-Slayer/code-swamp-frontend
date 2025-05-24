import { store } from "@/app/store/store"
import { refreshAccessToken } from "./refresh"
import { clear, setAccessTokenAction, setAuthLoadingAction } from "@/features/auth/store/authSlice"
import { clearUser, setUser } from "@/features/user/store/userSlice"

let hasAttemptedAutoLogin = false

export const attemptAutoLogin = async () => {
    if (hasAttemptedAutoLogin) return
    console.log("attempt to auto login")
    hasAttemptedAutoLogin = true

    const accessToken = store.getState().auth.accessToken

    if (accessToken) {
        store.dispatch(setAuthLoadingAction(false))
        return;
    }

    try {
        const res = await refreshAccessToken()

        store.dispatch(setAccessTokenAction(res.accessToken))
        store.dispatch(setUser({
            name: res.userProfile.nickname,
            profileImage: res.userProfile.profileImage
        }))
    } catch (err) {
        store.dispatch(clear())
        store.dispatch(clearUser())
    } finally {
        store.dispatch(setAuthLoadingAction(false))
    }
}
