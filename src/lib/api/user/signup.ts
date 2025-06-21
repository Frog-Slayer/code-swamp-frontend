import { defaultFetch } from "@/lib/api/fetch/defaultFetch"

export interface SignupRequest {
    token: string
    email: string
    username: string
    nickname: string
    profileImageUrl: string
}

interface SignupResponse {
    otp: string
}

export const signUp = async (payload: SignupRequest) : Promise<SignupResponse> => {
    const res = await defaultFetch<SignupResponse>('/users/signup', {
        method: 'POST',
        body: payload 
    })
}