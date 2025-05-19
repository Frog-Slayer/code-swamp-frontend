import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/features/user/store'
import { setUser, clearUser } from '@/features/user/store/slice/userSlice'
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
