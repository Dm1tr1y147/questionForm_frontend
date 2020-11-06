import { useParams } from 'react-router-dom'

export const useId = () => {
  const { id: idString } = useParams<{ id: string }>()

  return parseInt(idString)
}
