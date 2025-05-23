import { useAuth } from "@/features/auth/hooks/useAuth"
import { useUser } from "@/features/user/hooks/useUser"
import { usePrivateFetch } from "@/lib/customFetch"

interface LogoutResponse {
    message: string
}

export const useLogout = () => {
    const privateFetch = usePrivateFetch()
    const { clearAuthData } = useAuth()
    const { clearUser } = useUser()

    const logout = async () : Promise<LogoutResponse> => {
            try {
            const res = await privateFetch<LogoutResponse>('/logout', {
                method: 'POST',
            })

            if (!res) {
                throw new Error("Logout failed")
            }

            clearUser()
            clearAuthData()
            return res
        }
        catch (err) {
            throw new Error("Logout failed")
        }
    }

    return logout
}