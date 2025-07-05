import { store } from "@/app/store/store";
import { refreshAccessToken } from "@/lib/api/auth/refresh";
import { FetchOptions, defaultFetch } from "./defaultFetch";

let refreshPromise: Promise<string | null> | null = null

const attemptRefresh = async (): Promise<string | null> => {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            try {
                const res = await refreshAccessToken()
                return res.accessToken
            } catch (err) {
                return null
            }
            finally {
                refreshPromise = null
            }
    })()
}
    return refreshPromise
}

export const privateFetch = async <T = any>(
    uri: string, options: FetchOptions
) : Promise<T | undefined>  => {
    const accessToken = store.getState().auth.accessToken

    try {
        const authHeaders = new Headers(options.headers)
        console.log(accessToken)
        authHeaders.set('Authorization', `Bearer ${accessToken}`)

        return await defaultFetch<T>(uri, {...options, headers: authHeaders, credentials: 'include'})
    }
    catch (err) {
        if (!accessToken || (err instanceof Response && err.status === 401)) {
            const newAccessToken = await attemptRefresh()
            if (!newAccessToken) throw new Error("Cannot refresh token")
            
            const retryHeaders = new Headers(options.headers)
            retryHeaders.set("Authorization", `Bearer ${newAccessToken}`)

            return await defaultFetch<T>(uri, {
                ...options,
                headers: retryHeaders,
                credentials: "include"
            })
        }

        throw err
    }

}