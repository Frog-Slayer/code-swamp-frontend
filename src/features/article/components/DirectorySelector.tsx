import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
  import { ChevronDownIcon, FolderIcon } from "lucide-react";
  
  export function DirectorySelector() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center text-sm text-gray-700 hover:text-black font-medium">
            <FolderIcon className="w-4 h-4 mr-1" />
            기술 블로그
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem>기술 블로그</DropdownMenuItem>
          <DropdownMenuItem>일상</DropdownMenuItem>
          <DropdownMenuItem>면접 회고</DropdownMenuItem>
          <DropdownMenuItem>스터디</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  