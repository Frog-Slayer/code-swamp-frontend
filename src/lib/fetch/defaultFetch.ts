const BASE_URL = process.env.NEXT_PUBLIC_API_URL

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export interface FetchOptions extends Omit<RequestInit, 'body'> {
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

        throw new Error(errorMessage)
    }


    const contentLength = response.headers.get("Content-Length")
    const contentType = response.headers.get("Content-Type")

    if (
        response.status === 204 ||
        contentLength === "0" ||
        !contentType?.includes("application/json")
    ) {
        return undefined
    }


    try {
        return await response.json()
    } catch (e) {
        throw new Error("cacnnot parse response to json")
    }
}
