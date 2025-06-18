'use client'

import { TreeNode } from "@/features/workspace/types/treeNode"
import SidebarHieararchy from "@/components/layout/sidebar/SidebarHierarchy";
import { FolderRecord } from "@/features/workspace/types/folder";
import { Article } from "@/features/workspace/types/treeNode";
import { buildTree } from "@/features/workspace/utils/buildTree";
import { Sidebar } from "@/components/ui/sidebar";

const testFolders: FolderRecord = {
  "root": { id: "root", name: "Root Folder", parentId: null },
  "f1": { id: "f1", name: "Frontend", parentId: "root" },
  "f2": { id: "f2", name: "Backend", parentId: "root" },
  "f3": { id: "f3", name: "React", parentId: "f1" },
  "f4": { id: "f4", name: "Spring", parentId: "f2" },
};

export const testArticles: Article[] = [
  { id: "a1", folderId: "f1", title: "JavaScript Basics"},
  { id: "a2", folderId: "f3", title: "React Hooks"},
  { id: "a3", folderId: "f2", title: "Backend Overview"},
  { id: "a4", folderId: "f4", title: "Spring Boot Intro"},
  { id: "a5", folderId: "root", title: "Welcome!"},
];

interface SidebarProps { 
    tree: TreeNode
}

const BlogSidebar = () => {

    const tree = buildTree(testArticles, testFolders)

    return ( 
        <Sidebar className="mt-16" variant="sidebar">
            <SidebarHieararchy tree={tree}/>
        </Sidebar>
    )
}

export default BlogSidebar