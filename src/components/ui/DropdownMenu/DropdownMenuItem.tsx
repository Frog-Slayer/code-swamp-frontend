import { ReactNode } from "react"

interface DropdownMenuItemProps{
    children: ReactNode
    onClick?: () => void
    className?: string
}

export const DropdownMenuItem = ({children, onClick, className} : DropdownMenuItemProps) => {

    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    )
}