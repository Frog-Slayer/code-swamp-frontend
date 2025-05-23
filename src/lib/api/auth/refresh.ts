import { store } from "@/app/store/store"
import { setAccessTokenAction } from "@/features/auth/store/authSlice"
import { setUser } from "@/features/user/store/userSlice"
import { defaultFetch } from "@/lib/customFetch"

interface RefreshResult {
    accessToken: string,
    userProfile: {
        nickname: string,
        profileImage: string
    }
}

export const refreshAccessToken = async () : Promise<RefreshResult> => {
    try {
        const res = await defaultFetch<RefreshResult> (
            "/auth/refresh",
            {
                method: "GET",
                credentials: "include"
            })

        if (!res || !res.accessToken) {
            throw new Error("cannot refresh token")
        }

        store.dispatch(setAccessTokenAction(res.accessToken))
        store.dispatch(setUser({
            name: res.userProfile.nickname,
            profileImage: res.userProfile.profileImage
        }))
        return res
    }
    catch (err) {
        throw new Error("cannot refresh token")
    }
}
