import { ApolloQueryResult } from '@apollo/client'

import { IFormQuery, AnswerT, QuestionT } from '../../types'
import { QueryFormArgs, ServerAnswer } from '../../apollo/typeDefs.gen'

export type RefetchQuestionsFT = (
  variables?: Partial<QueryFormArgs> | undefined
) => Promise<ApolloQueryResult<IFormQuery>>

export interface IFormSubmitMutation {
  formSubmit: ServerAnswer
}

export type GetInitialStateFT = (questions: QuestionT[]) => AnswerT[]
