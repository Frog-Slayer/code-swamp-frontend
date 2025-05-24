import PillButton from "@/components/ui/PillButton/PillButton";


const LoginButton = () => {
    const handleClick = () => {
        alert("click login")
    }

    return (
        <PillButton 
            onClick={handleClick}
            label="로그인"
        />
    )
}

export default LoginButton;