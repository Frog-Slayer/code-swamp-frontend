import { usePrivateFetch } from "@/lib/customFetch"

const privateFetch = usePrivateFetch()

interface TempLoginRequest {
    email: string,
    token: string
}

export const temporaryLogin = async (payload : TempLoginRequest ) => {
    const res = privateFetch("/auth/signup-login", {
        method: 'POST', 
        body: payload
    })
}