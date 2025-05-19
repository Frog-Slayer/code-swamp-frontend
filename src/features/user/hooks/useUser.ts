import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store/store'
import { setUser, clearUser } from '@/features/user/store/userSlice'
import { User } from '@/features/user/types/user'

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()

  return {
    user,
    setUser: (user: User) => dispatch(setUser(user)),
    clearUser: () => dispatch(clearUser()),
  }
}
