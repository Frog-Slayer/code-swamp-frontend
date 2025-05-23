import { defaultFetch } from "@/lib/customFetch"

export interface SignupRequest {
    token: string
    email: string
    username: string
    nickname: string
    profileImageUrl: string
}

export const signUp = async (payload: SignupRequest) : Promise<void> => {
    const res = await defaultFetch<void>('/users/signup', {
        method: 'POST',
        body: payload 
    })
}