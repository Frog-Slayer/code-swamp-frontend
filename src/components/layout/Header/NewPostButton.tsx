import PillButton from "@/components/ui/PillButton/PillButton"
import { CiSquarePlus } from "react-icons/ci"

const NewPostButton = () => {
    const handleClick = () => {
        alert("new post")
    }

    return ( 
        <PillButton Icon={CiSquarePlus} label="새 글" onClick={handleClick} />
    )
}

export default NewPostButton;