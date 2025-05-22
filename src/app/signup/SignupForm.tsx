'use client'

import InputWithValidation from "@/components/ui/InputWithValidation/InputWithValidation"
import { setUser } from "@/features/user/store/userSlice"
import { SignupRequest } from "@/lib/api/user/type"
import { useEffect, useState } from "react"
import styles from './SignupForm.module.css'
import PillButton from "@/components/ui/PillButton/PillButton"

interface SignupFormProps {
    onSubmit: (form: SignupRequest) => void
    defaultValues: Partial<SignupRequest>
}

const SignUpForm = ({ onSubmit, defaultValues } : SignupFormProps) => {
  const token = defaultValues?.token ?? ''
  const [email, setEmail] = useState(defaultValues?.email ?? '')
  const [profileImage, setProfileImage] = useState(defaultValues?.profileImageUrl ?? '')
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState(defaultValues?.nickname ?? '')

  const validateNickname = (val: string) => {
    if (val.length < 2) return '2자 이상 입력해주세요.';
    if (val.length > 12) return '12자를 넘을 수 없습니다.';
    if (val.trim() !== val) return '앞뒤 공백은 허용되지 않습니다.';
    if (!/^[A-Za-z0-9가-힣 ]+$/.test(val)) return '사용할 수 없는 문자가 포함되어 있습니다.';
    return '';
  }

  const validateUsername = (val: string) => {
    if (val.length < 2) return '2자 이상 입력해주세요.';
    if (val.length > 12) return '12자를 넘을 수 없습니다.';
    if (!/^[A-Za-z0-9]+$/.test(val)) return '사용할 수 없는 문자가 포함되어 있습니다.';
    return '';
  }

  const [validities, setValidities] = useState<{[key:string] : boolean}> ({
    username: false,
    nickname: false
  });

  const handleValidChange = (key: string, isValid: boolean) => {
    setValidities((prev) => ({ ...prev, [key] : isValid}) )
  }

  const isFormValid = Object.values(validities).every(Boolean)

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      if (!isFormValid) {
        alert("폼 확인")
        return
      }

      onSubmit({
        token: token,
        email,
        username,
        nickname,
        profileImageUrl: profileImage
      })
  }

  return (
    <div className={styles.container}> 
      <h2 className = {styles.title}> 회원가입 </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputWithValidation type="email" label="이메일" placeholder="이메일" name="email" value= {email} readOnly/>

        <InputWithValidation placeholder="ID" label = "아이디" name="username" value= {username} onChange = {setUsername}
                      validate={validateUsername} onValidChange={(isValid) => handleValidChange('username', isValid)} />

        <InputWithValidation placeholder="닉네임" label = "닉네임" name="nickname" value= {nickname}  onChange= {setNickname}
                      validate={validateNickname} onValidChange={(isValid) => handleValidChange('nickname', isValid)} />
                      
        <button className={styles.button} type="submit" disabled={!isFormValid}>
          가입하기
        </button>
      </form>
    </div>
  )
}

export default SignUpForm 