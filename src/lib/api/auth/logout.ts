import { store } from "@/app/store/store"
import { clear } from "@/features/auth/store/authSlice"
import { clearUser } from "@/features/user/store/userSlice"
import { privateFetch } from "@/lib/customFetch"

interface LogoutResponse {
    message: string
}

export const logout = async () => {
    try {
        const res = await privateFetch<LogoutResponse>('/logout', {
            method: 'POST',
        })
    }
    catch (err) {
        console.log(err)
    }
    finally {
        store.dispatch(clear())
        store.dispatch(clearUser())
    }
}
