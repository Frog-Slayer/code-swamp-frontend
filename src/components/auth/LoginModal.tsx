import Modal from "@/components/ui/Modal/Modal"
import SocialLoginButton from "./SocialLoginButton";

interface LoginModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

const LoginModal = ({isOpen, handleClose}: LoginModalProps) => {
    const handleClick = () => {
        console.log("로그인하기")
    }

    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <SocialLoginButton label = "Google로 로그인 하기"
                                onClick={() => handleClick()}
                                />
            <SocialLoginButton label = "Github로 로그인 하기"
                                onClick={() => handleClick()}
                                />
        </Modal>
    )
}

export default LoginModal;