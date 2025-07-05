import { defaultFetch } from "@/lib/api/fetch/defaultFetch"

interface TempLoginRequest {
    email: string,
    token: string
}

export const testLogin = async (payload : TempLoginRequest) : Promise<AuthResult>  => {
    try {
        const res = await defaultFetch<AuthResult>(
            "/auth/test-login", 
            {
                method: 'POST', 
                body: payload,
                credentials: "include"
            })

        if (!res) throw new Error("Need to login again")

        return res;
    }
    catch (err) {
        throw new Error("Need to login again")
    }
}