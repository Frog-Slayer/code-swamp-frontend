import { Article, TreeNode } from "../types/treeNode"
import { Folder, FolderRecord } from "../types/folder"

export const buildTree = (articles: Article[], folders: FolderRecord): TreeNode => {
    const folderChildrenMap: Record<string, TreeNode[]> = {}

    Object.values(folders).forEach(folder => {
      if (folder.parentId) {
        if (!folderChildrenMap[folder.parentId]) folderChildrenMap[folder.parentId] = [];
        folderChildrenMap[folder.parentId].push({
          id: folder.id,
          name: folder.name,
          type: "folder",
          children: [],
        })
      }
    })
  
    const rootFolder = Object.values(folders)
      .find(f => f.parentId == null)

    if (!rootFolder) throw new Error("Root folder not found")
    
    const rootNode: TreeNode = {
        id: rootFolder.id,
        name: rootFolder.name,
        type: "folder",
        children: [],
    }
  
    const postsByFolder: Record<string, Article[]> = {}
  
    articles.forEach(article => {
      if (!postsByFolder[article.folderId]) postsByFolder[article.folderId] = [];
      postsByFolder[article.folderId].push(article);
    })
  
    const attachChildren = (folderNode: TreeNode): TreeNode => {
      const childFolders = folderChildrenMap[folderNode.id] || []
      const postNodes = (postsByFolder[folderNode.id] || []).map(post => ({
        id: post.id,
        type: "article" as const,
        name: post.title,
        post,
      }))
  
      folderNode.children = [...childFolders.map(attachChildren), ...postNodes];
      return folderNode;
    }
  
    return attachChildren(rootNode)
}