import { store } from "@/app/store/store";
import { refreshAccessToken } from "./api/auth/refresh";

const BASE_URL = 'http://localhost:8080'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

interface FetchOptions extends Omit<RequestInit, 'body'> {
    method?: HttpMethod,
    body?: BodyInit | object
}

export const  defaultFetch = async <T = any>(
    uri: string, options: FetchOptions
) : Promise<T | undefined>  => {
    const url = `${BASE_URL}${uri}`
    const { method = "GET", headers, body, ...rest } = options

    const fetchHeaders = new Headers(headers)

    let fetchBody : BodyInit | undefined = undefined

    if (body) {
        if (body instanceof FormData) {
            fetchBody = body
        }
        else {
            fetchHeaders.set('Content-Type', 'application/json' )
            fetchBody = JSON.stringify(body)
        }
    }

    const fetchOptions : RequestInit = { 
        method,
        headers: fetchHeaders,
        body: fetchBody,
        ...rest
    }

    const response = await fetch(url, fetchOptions) 

    if (!response.ok) {
        let errorMessage

        try {
            const errorData = await response.json()
            if (errorData?.message) {
                errorMessage = errorData.message
            }
        } catch (err) {
            errorMessage = `Error: ${response.status}`
        }

        console.log(errorMessage)

        throw new Error(errorMessage)
    }


    const contentLength = response.headers.get("Content-Length")
    const contentType = response.headers.get("Content-Type")

    if (
        response.status === 204 ||
        contentLength === "0" ||
        !contentType?.includes("application/json")
    ) {
        console.log(response.text())
        return undefined
    }


    try {
        return await response.json()
    } catch (e) {
        throw new Error("cacnnot parse response to json")
    }
}

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
