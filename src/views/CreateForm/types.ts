import { FormEvent, ChangeEvent } from 'react'
import { ApolloError } from '@apollo/client'

import { ServerAnswer } from '../../apollo/typeDefs.gen'

export type FormQuestionT<T extends string> = {
  title: string
  type: T
  variants: string[]
}

export type FormT<T extends string> = {
  title: string
  questions: FormQuestionT<T>[]
}

export type FormatQuestionsToSubmitFT = <T extends string>(
  questions: FormQuestionT<T>[]
) => string

export interface ICreateFormMutation {
  createForm: ServerAnswer
}

export type FormSubmitT = (e: FormEvent<HTMLFormElement>) => void

export type HandleFormTitleChangeFT = (e: ChangeEvent<HTMLInputElement>) => void

export type CreateQuestionFT<T extends string> = (type: T) => void

export type HandleQuestionTitleChangeFT = (
  questionNumber: number,
  e: ChangeEvent<HTMLInputElement>
) => void

export type AddVariantFT = (questionNumber: number) => void

export type HandleAnswerVariantChangeFT = (
  questionNumber: number,
  variantNumber: number,
  e: ChangeEvent<HTMLInputElement>
) => void

export type UseFormCreatorHookTurpleT<T extends string> = [
  FormT<T>,
  [
    FormSubmitT,
    {
      submitData: ICreateFormMutation | null | undefined
      submitError: ApolloError | undefined
      submitLoading: boolean
    }
  ],
  {
    handleFormTitleChange: HandleFormTitleChangeFT
    addQuestion: CreateQuestionFT<T>
    handleQuestionTitleChange: HandleQuestionTitleChangeFT
    handleAnswerVariantChange: HandleAnswerVariantChangeFT
    addVariant: AddVariantFT
  },
  () => void
]

export type QuestionTypes = 'CHECK' | 'INPUT' | 'CHOOSE' | 'SELECT'
