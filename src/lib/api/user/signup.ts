import { defaultFetch } from "@/lib/customFetch"
import { SignupRequest } from "./type"


export const signUp = async (payload: SignupRequest) : Promise<void> => {
    await defaultFetch<void>('/users/signup', {
        method: 'POST',
        body: payload 
    })
}