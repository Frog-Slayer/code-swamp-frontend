import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface SidebarProfileProps {
  profileImage: string;
  username: string;
  nickname: string;
  bio: string;
}

const SidebarProfile = (props: SidebarProfileProps) => {
  const { profileImage, username, nickname, bio } = props;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="w-8 h-8 ring-2 ring-primary/10 shadow-sm">
            <AvatarImage
              src={profileImage || "/placeholder.svg"}
              alt={nickname}
            />
            <AvatarFallback className="text-2xl font-bold">
              {nickname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="font-semibold truncate">{nickname}</span>
            <span className="text-sm text-muted-foreground truncate">
              @{username}
            </span>
          </div>
        </SidebarMenuButton>
     </SidebarMenuItem>
    <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
        <span className="text-sm text-muted-foreground line-clamp-4 m-4">
            {bio}
        </span>
    </SidebarMenuItem>
 
    </SidebarMenu>
  );
};

export default SidebarProfile;
