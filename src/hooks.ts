import { useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ContextType, initialUser, UserType } from './context'

export const useUser = (): ContextType => {
  const [user, internalSerUser] = useState<UserType>(initialUser)

  const setUser = useCallback((user: UserType): void => {
    internalSerUser(user)
  }, [])

  return { user, setUser }
}

export const useURLQuery = () => {
  return new URLSearchParams(useLocation().search)
}
