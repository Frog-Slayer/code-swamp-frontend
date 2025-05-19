import PillButton from "@/components/ui/PillButton/PillButton";

interface LoginButtonProps {
    onClick: () => void
}

const LoginButton = ({onClick}: LoginButtonProps) => {
    return (
        <PillButton 
            onClick={onClick}
            label="로그인"
        />
    )
}

export default LoginButton;