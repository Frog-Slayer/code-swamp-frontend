import { defaultFetch } from "@/lib/fetch/defaultFetch"

interface TempLoginRequest {
    email: string,
    token: string
}

export const temporaryLogin = async (payload : TempLoginRequest) : Promise<AuthResult>  => {
    try {
        const res = await defaultFetch<AuthResult>(
            "/auth/temp-login", 
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