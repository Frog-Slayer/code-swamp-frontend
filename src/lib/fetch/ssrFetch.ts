import { cookies } from "next/headers";
import { FetchOptions, defaultFetch } from "./defaultFetch";

export const ssrFetch = async <T = any>(
    uri: string, options: FetchOptions
) : Promise<T | undefined>  => {
    const cookieStore = await cookies()
    console.log(cookieStore)
    const accessToken = cookieStore.get('access_token')?.value
    console.log(accessToken)

    try {
        const authHeaders = new Headers(options.headers)
        authHeaders.set('Authorization', `Bearer ${accessToken}`)

        return await defaultFetch<T>(uri, {...options, headers: authHeaders})
    }
    catch (err) {
        throw err
    }
}
