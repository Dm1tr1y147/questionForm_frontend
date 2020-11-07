import { useState, useCallback } from 'react'
import { AnswerT, QuestionT } from '../../types'
import { getInitialState } from './utils'

export const useForm = () => {
  const [answers, setAnswers] = useState<AnswerT[]>([])

  const changeAnswer = useCallback(
    (num: number) => (value: number | string) =>
      setAnswers((prev) =>
        prev.map((el, index) => {
          if (index === num) {
            if (el.__typename === 'ChoiseAnswer' && typeof value === 'number')
              return { ...el, userChoise: value }
            if (el.__typename === 'InputAnswer' && typeof value === 'string')
              return { ...el, userInput: value }
          }
          return el
        })
      ),
    [setAnswers]
  )

  const setInitialState = useCallback(
    (questions: QuestionT[]) => {
      const state = getInitialState(questions)
      setAnswers(state)
    },
    [setAnswers]
  )

  return { answers, changeAnswer, setInitialState }
}
