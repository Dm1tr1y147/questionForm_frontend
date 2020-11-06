import { GetDateCreatedFT } from './types'

export const getDateCreated: GetDateCreatedFT = (dateString) => {
  const date = new Date(dateString)

  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
}
