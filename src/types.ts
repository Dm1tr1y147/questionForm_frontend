import {
  InputQuestion,
  ChoisesQuestion,
  InputAnswer,
  ChoiseAnswer,
  Form,
} from './apollo/typeDefs.gen'

export type QuestionT = InputQuestion | ChoisesQuestion

export type AnswerT = InputAnswer | ChoiseAnswer

export interface IFormQuery {
  form: Form
}
