import { useAuth } from "@/features/auth/hooks/useAuth";

const BASE_URL = 'http://localhost:8080'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

interface FetchOptions extends Omit<RequestInit, 'body'> {
    method?: HttpMethod,
    body?: BodyInit | Record<string, unknown>
}

export const  defaultFetch = async <T = any>(
    uri: string, options: FetchOptions
) : Promise<T>  => {
    const url = `${BASE_URL}${uri}`
    const { method = "GET", headers, body, ...rest } = options

    const fetchHeaders = new Headers(headers)

    let fetchBody : BodyInit | undefined = undefined

    if (body) {
        if (body instanceof FormData) {
            fetchBody = body;
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

    //TODO: Error Handling

    return response.json()
}

export const usePrivateFetch = () => {
    const { accessToken } = useAuth();

    const privateFetch = async <T>(uri: string, options: FetchOptions) : Promise<T>  => {
        const authHeaders = new Headers(options.headers)

        if (!accessToken) throw new Error("No access token available")

        authHeaders.set('Authorization', `Bearer ${accessToken}`)

        return defaultFetch<T>(uri, {...options, headers: authHeaders, credentials: 'include'})
    }

    return privateFetch
}