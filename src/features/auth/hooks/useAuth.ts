import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store/store'
import { setAccessTokenAction, setSignupTokenAction, logoutAction, setAuthLoadingAction } from '@/features/auth/store/authSlice'

export const useAuth = () => {
  const { accessToken, signupToken, isAuthenticated, isAuthLoading } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const setAccessToken = (accessToken: string) => {
    dispatch(setAccessTokenAction(accessToken));
  }

  const setSignupToken = (signupToken: string) => {
    dispatch(setSignupTokenAction(signupToken));
  }

  const logout = () => {
    dispatch(logoutAction())
  }

  const setAuthLoading = (isLoading : boolean) => {
    dispatch(setAuthLoadingAction(isLoading))
  }

  return {
    accessToken,
    signupToken,
    isAuthenticated,
    isAuthLoading,
    setAccessToken,
    setAuthLoading,
    setSignupToken,
    logout,
  }
}
