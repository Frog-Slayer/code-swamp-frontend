import { useAuth } from "@/features/auth/hooks/useAuth"
import { defaultFetch } from "@/lib/customFetch"

interface RefreshResult {
    accessToken: string,
    userProfile: {
        nickname: string,
        profileImage: string
    }
}

export const useRefreshAccessToken = () => {
    const { login, signout } = useAuth()

    const refreshAccessToken = async () : Promise<RefreshResult> => {
        const res = await defaultFetch<RefreshResult> (
            "/auth/refresh",
            {
                method: "GET",
                credentials: "include"
            })

        if (!res || !res.accessToken) {
            signout()
            throw new Error("cannot refresh token")
        }

        login(res.accessToken)

        return res
    }

    return refreshAccessToken
}