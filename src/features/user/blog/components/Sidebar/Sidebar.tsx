"use client";

import { TreeNode } from "@/features/workspace/types/treeNode";
import SidebarHieararchy from "@/features/user/blog/components/Sidebar/SidebarHierarchy";
import { FolderRecord } from "@/features/workspace/types/folder";
import { Article } from "@/features/workspace/types/treeNode";
import { buildTree } from "@/features/workspace/utils/buildTree";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { ChevronLeft, SidebarCloseIcon } from "lucide-react";
import SidebarProfile from "./SidebarProfile";

const testFolders: FolderRecord = {
  root: { id: "root", name: "Root Folder", parentId: null },
  f1: { id: "f1", name: "Frontend", parentId: "root" },
  f2: { id: "f2", name: "Backend", parentId: "root" },
  f3: { id: "f3", name: "React", parentId: "f1" },
  f4: { id: "f4", name: "Spring", parentId: "f2" },
};

export const testArticles: Article[] = [
  { id: "a1", folderId: "f1", title: "JavaScript Basics" },
  { id: "a2", folderId: "f3", title: "React Hooks" },
  { id: "a3", folderId: "f2", title: "Backend Overview" },
  { id: "a4", folderId: "f4", title: "Spring Boot Intro" },
  { id: "a5", folderId: "root", title: "Welcome!" },
];

interface SidebarProps {
  tree: TreeNode;
}

const BlogSidebar = () => {
  const tree = buildTree(testArticles, testFolders);

  const profile = {
    profileImage: "profileImage",
    nickname: "nickname",
    username: "reunai",
    bio: "ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
  };

  return (
    <>
      <Sidebar collapsible="icon" className="mt-16" variant="sidebar">
        <SidebarHeader>
          <SidebarProfile {...profile} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarHieararchy tree={tree} />
        </SidebarContent>
      </Sidebar>
      <main>
        <SidebarTrigger />
      </main>
    </>
  );
};

export default BlogSidebar;
