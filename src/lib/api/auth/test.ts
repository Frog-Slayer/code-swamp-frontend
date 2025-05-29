import { privateFetch } from "@/lib/customFetch"

export const testRequest = async () : Promise<{testVal: string}> => {
    try {
        const res = await privateFetch<{testVal: string}> (
            "/auth/test",
            {
                method: "GET",
                credentials: "include"
        })
        if (!res) throw new Error("cannot fetch test")
        return res
    }
    catch (err) {
        throw new Error("test failed")
    }
}

