import { createContext } from 'react'

export type UserType = {
  id: number
  email: string
  name: string
}

export type ContextType = {
  user: UserType
  setUser: (user: UserType) => void
}

export const initialUser: UserType = {
  email: '',
  id: 0,
  name: ''
}

const initialState: ContextType = {
  user: initialUser,
  setUser: () => {}
}

const Context = createContext<ContextType>(initialState)

export default Context
