import {
  InputQuestion,
  ChoisesQuestion,
  InputAnswer,
  ChoiseAnswer,
  Form,
  User,
} from './apollo/typeDefs.gen'

export type QuestionT = InputQuestion | ChoisesQuestion

export type AnswerT = InputAnswer | ChoiseAnswer

export interface IFormQuery {
  form: Form
}

export type GetDateCreatedFT = (dateString: string) => string

export interface IUserQuery {
  user: User
}
