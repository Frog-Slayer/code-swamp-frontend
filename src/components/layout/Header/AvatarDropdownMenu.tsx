import { RootState } from "@/app/store/store"
import Avatar from "@/components/ui/Avatar/Avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/DropdownMenu"
import { useSelector } from "react-redux"
import { VscSettingsGear } from "react-icons/vsc"
import { IoIosLogOut } from "react-icons/io"
import styles from "./AvatarDropdownMenu.module.css"

interface AvatarDropdownMenuProps {
    onClickAvatar: () => void
    onClickSettings: () => void
    onClickLogout: () => void
}

const AvatarDropdownMenu = ({onClickAvatar, onClickLogout, onClickSettings}: AvatarDropdownMenuProps) => {
    const user = useSelector((state: RootState) => (state.user.user));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar
                    src = { user?.profileImage ?? '-'}
                    alt = "avatar"
                    size = {40}
                    onClick={() => console.log("click avatar")}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className={styles.dropdownContent}>
                <DropdownMenuItem className={styles.dropdownItem} onClick={onClickAvatar}>
                    <div className={styles.dropdownItemLogo}> 
                        <Avatar
                            src = { user?.profileImage ?? '-'}
                            alt = "avatar"
                            size = {40}
                            onClick={() => console.log("click avatar")}
                        />
                    </div>
                    <div className={styles.dropdownItemContent}>
                        @frog_slayer
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem className={styles.dropdownItem} onClick={onClickSettings}>
                    <div className={styles.dropdownItemLogo}> 
                        <VscSettingsGear />
                    </div>
                    Settings
                </DropdownMenuItem>

                <DropdownMenuItem className={styles.dropdownItem} onClick={onClickLogout}>
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