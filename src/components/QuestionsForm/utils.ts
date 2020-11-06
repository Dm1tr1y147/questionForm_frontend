import { AnswerT } from '../../types'
import { GetInitialStateFT } from './types'

export const getInitialState: GetInitialStateFT = (questions) =>
  questions.flatMap<AnswerT>((el) => {
    if (el.__typename === 'ChoisesQuestion')
      return [{ __typename: 'ChoiseAnswer', type: 'CHOISE', userChoise: -1 }]
    if (el.__typename === 'InputQuestion')
      return [{ __typename: 'InputAnswer', type: 'INPUT', userInput: '' }]
    return []
  })
