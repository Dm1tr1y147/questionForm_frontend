import { LogOutFT } from './types'

export const logOut: LogOutFT = (refetch, history) => {
  localStorage.removeItem('token')
  refetch()
  history.push('/')
}
