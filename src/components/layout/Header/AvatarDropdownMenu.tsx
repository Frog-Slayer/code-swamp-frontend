import { RootState } from "@/app/store/store"
import { useSelector } from "react-redux"
import styles from "./AvatarDropdownMenu.module.css"
import { VscSettingsGear } from "react-icons/vsc"
import { IoIosLogOut } from "react-icons/io"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

interface AvatarDropdownMenuProps {
    onClickAvatar: () => void
    onClickSettings: () => void
    onClickLogout: () => void
}

const AvatarDropdownMenu = ({onClickAvatar, onClickLogout, onClickSettings}: AvatarDropdownMenuProps) => {
    const user = useSelector((state: RootState) => (state.user.user));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src = { user?.profileImage ?? '-'} />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" side="bottom" sideOffset={14}>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={onClickAvatar}>
                    <div className={styles.dropdownItemLogo}> 
                        <Avatar>
                            <AvatarImage src = { user?.profileImage ?? '-'} />
                        </Avatar>
                    </div>
                    <div className={styles.dropdownItemContent}>
                        @frog_slayer
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={onClickSettings}>
                    <div className={styles.dropdownItemLogo}> 
                        <VscSettingsGear />
                    </div>
                    Settings
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={onClickLogout}>
                    <div className={styles.dropdownItemLogo}> 
                        <IoIosLogOut/>
                    </div>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarDropdownMenu