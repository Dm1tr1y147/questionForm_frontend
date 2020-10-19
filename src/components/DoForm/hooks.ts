import { useState } from 'react'
import { ChoiseAnswer, InputAnswer } from '../../apollo/typeDefs.gen'

export const useForm = (initialValue?: (InputAnswer | ChoiseAnswer)[]) => {
  const [answers, setAnswer] = useState<(InputAnswer | ChoiseAnswer)[]>(
    initialValue || []
  )

  const answerChange = (num: number) => {
    return (value: number | string) => {
      setAnswer((prev) => {
        return prev.map((el, index) => {
          if (index === num) {
            if (el.__typename === 'ChoiseAnswer' && typeof value === 'number')
              return { ...el, userChoise: value }
            if (el.__typename === 'InputAnswer' && typeof value === 'string')
              return { ...el, userInput: value }
          }
          return el
        })
      })
    }
  }

  return [answers, answerChange]
}
