import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuSub, SidebarProvider } from "@/components/ui/sidebar"
import { TreeNode } from "@/features/workspace/types/treeNode"
import { ChevronDown, Folder, FoldHorizontal } from "lucide-react"
import { useState } from "react"


interface SidebarHierarchyProps { 
    tree: TreeNode
    currentArticleId? : string
    currentFolderId? : string
}

const SidebarHieararchy = ({ tree, currentArticleId, currentFolderId } : SidebarHierarchyProps) => {
    const moveToFolder = () => {}
    console.log(tree)

    return ( 
        <SidebarContent>
            <SidebarMenu>
                <HierarchyItem key={tree.id} node={tree} currentPostId={currentArticleId} />
            </SidebarMenu>
        </SidebarContent>
    )
}

const HierarchyItem = ({ node, currentPostId}:{ node: TreeNode; currentPostId?: string })=> {

    if (node.type === "folder") {
        console.log("folder")
      return (
        <Collapsible defaultOpen={false}>
           <div className="flex px-2 py-1 hover:bg-muted">
                <CollapsibleTrigger asChild>
                    <ChevronDown/>
                </CollapsibleTrigger>
                {node.name}
          </div>

          <CollapsibleContent>
            <SidebarMenuSub>
            {node.children?.map((child) => (
              <HierarchyItem key={child.id} node={child} currentPostId={currentPostId} />
            ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      );
    } else if (node.type === "article") {
      const isActive = node.id === currentPostId;
      return (
        <SidebarMenuSub> {node.name} </SidebarMenuSub>
      );
    }
    return null;
};



export default SidebarHieararchy