import { store } from "@/app/store/store"
import { clear } from "@/features/auth/store/authSlice"
import { clearUser } from "@/features/user/store/userSlice"
import { privateFetch } from "@/lib/customFetch"

interface LogoutResponse {
    message: string
}

export const logout = async () : Promise<LogoutResponse> => {
        try {
        const res = await privateFetch<LogoutResponse>('/logout', {
            method: 'POST',
        })

        if (!res) {
            throw new Error("Logout failed")
        }

        store.dispatch(clear())
        store.dispatch(clearUser())
        return res
    }
    catch (err) {
        throw new Error("Logout failed")
    }
}
