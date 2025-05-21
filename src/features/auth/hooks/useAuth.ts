import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store/store'
import { setAccessToken, setSignupToken, logout } from '@/features/auth/store/authSlice'

export const useAuth = () => {
  const { accessToken, signupToken, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const login = (accessToken: string) => {
    dispatch(setAccessToken(accessToken));
  }

  const saveSignupToken = (signupToken: string) => {
    dispatch(setSignupToken(signupToken));
  }

  const signout = () => {
    dispatch(logout())
  }

  return {
    accessToken,
    signupToken,
    isAuthenticated,
    login,
    saveSignupToken,
    signout
  }
}
