import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider } from "@/components/ui/sidebar"
import { TreeNode } from "@/features/workspace/types/treeNode"
import { ChevronDown, File, Folder } from "lucide-react"
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
      <SidebarMenu>
        <SidebarMenuItem>
          <HierarchyItem key={tree.id} node={tree} currentPostId={currentArticleId} />
        </SidebarMenuItem>
      </SidebarMenu>
    )
}

const HierarchyItem = ({ node, currentPostId}:{ node: TreeNode; currentPostId?: string })=> {

    if (node.type === "folder") {
      return (
        <Collapsible defaultOpen={false}>
           <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition-colors">
                <CollapsibleTrigger asChild>
                  <SidebarMenuSubButton>
                    <ChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    <Folder/>
                    <span className="text-sm font-meium">{node.name}</span>
                  </SidebarMenuSubButton>
                </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <SidebarMenuSub className="w-full mx-1">
              {node.children?.map((child) => (
                <SidebarMenuItem key={child.id}>
                  <HierarchyItem node={child} currentPostId={currentPostId} />
                </SidebarMenuItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      );
    } else if (node.type === "article") {
      const isActive = node.id === currentPostId;
      return (
        <SidebarMenuSub className="w-full mx-1"> 
          <SidebarMenuSubItem>
              <SidebarMenuSubButton>
                <File/>
              <span className="text-sm font-meium">{node.name}</span>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      );
    }
    return null;
};



export default SidebarHieararchy