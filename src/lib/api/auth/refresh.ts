import { useAuth } from "@/features/auth/hooks/useAuth"
import { useUser } from "@/features/user/hooks/useUser"
import { defaultFetch } from "@/lib/customFetch"

interface RefreshResult {
    accessToken: string,
    userProfile: {
        nickname: string,
        profileImage: string
    }
}

export const useRefreshAccessToken = () => {
    const { setAccessToken } = useAuth()
    const { setUser } = useUser()

    const refreshAccessToken = async () : Promise<RefreshResult> => {
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

            setAccessToken(res.accessToken)
            setUser({
                name: res.userProfile.nickname,
                profileImage: res.userProfile.profileImage
            })
            return res
        }
        catch (err) {
            logout()
            throw new Error("cannot refresh token")
        }
    }

    return refreshAccessToken
}