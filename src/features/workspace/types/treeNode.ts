
export interface Article { 
    id: string;
    title: string;
    folderId: string;
}

export interface TreeNode {
    id: string
    type: "folder" | "article"
    name: string
    children?: TreeNode[]
    articles? : Article
}