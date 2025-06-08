import { readBySlug } from "@/lib/api/article/read/readBySlug"

interface ReadPageProps { 
    params: { 
        username: string
        slugPath: string[]
    }
}

const ReadPage = async ({ params } : ReadPageProps) => {
    console.log("reach here")
    const { username, slugPath } = params
    const path = slugPath.join('/')

    const res = await readBySlug(username, path)

    return ( 
        <>
        {res.content}
        </>
    )
}

export default ReadPage