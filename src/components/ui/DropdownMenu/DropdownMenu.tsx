import { createContext, ReactNode, RefObject, useContext, useEffect, useRef, useState } from "react"

interface DropdownMenuContextProps {
    open: boolean
    setOpen: (value: boolean) => void 
    toggle: () => void
    triggerRef: RefObject<HTMLDivElement| null>
}

const DropdownMenuContext = createContext<DropdownMenuContextProps | null>(null)

interface DropdownMenuProps {
    children: ReactNode
}

export const DropdownMenu = ({children} : DropdownMenuProps) => {
    const [open, setOpen] = useState(false)
    const triggerRef = useRef<HTMLDivElement>(null)
    const toggle = () => setOpen((prev) => !prev);

    return (
        <DropdownMenuContext.Provider value={{open, setOpen, toggle, triggerRef}}>
            <div>
                {children}
            </div>
        </DropdownMenuContext.Provider>
    )
}

export const useDropdownMenuContext = () => {
    const context = useContext(DropdownMenuContext)
    if (!context) throw new Error("Cannot use DropdownMenu")
    return context
}