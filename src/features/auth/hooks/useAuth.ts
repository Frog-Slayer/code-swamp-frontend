import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { setAccessToken, logout } from '@/features/auth/store/authSlice'

export const useAuth = () => {
  const { accessToken, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  )
  const dispatch = useDispatch()

  const login = (accessToken: string) => {
    dispatch(setAccessToken({accessToken}));
  }

  const signout = () => {
    dispatch(logout())

  }

  return {
    accessToken,
    isAuthenticated,
  }
}
