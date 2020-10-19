import { ApolloError, useMutation } from '@apollo/client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { CREATEFORM } from '../../apollo'
import { MutationCreateFormArgs, ServerAnswer } from '../../apollo/typeDefs.gen'

type FormQuestion<T extends string> = {
  title: string
  type: T
  variants: string[]
}

type Form<T extends string> = {
  title: string
  questions: FormQuestion<T>[]
}

export type FormatQuestionsToSubmitType = <T extends string>(
  questions: FormQuestion<T>[]
) => string

interface ICreateFormMutation {
  createForm: ServerAnswer
}

type FormSubmitType = (e: FormEvent<HTMLFormElement>) => void

type HandleFormTitleChangeType = (e: ChangeEvent<HTMLInputElement>) => void

type CreateQuestionType<T extends string> = (type: T) => void

type HandleQuestionTitleChangeType = (
  questionNumber: number,
  e: ChangeEvent<HTMLInputElement>
) => void

type AddVariantType = (questionNumber: number) => void

type HandleAnswerVariantChangeType = (
  questionNumber: number,
  variantNumber: number,
  e: ChangeEvent<HTMLInputElement>
) => void

type UseFormCreatorHookTurple<T extends string> = [
  Form<T>,
  [
    FormSubmitType,
    {
      submitData: ICreateFormMutation | null | undefined
      submitError: ApolloError | undefined
      submitLoading: boolean
    }
  ],
  {
    handleFormTitleChange: HandleFormTitleChangeType
    addQuestion: CreateQuestionType<T>
    handleQuestionTitleChange: HandleQuestionTitleChangeType
    handleAnswerVariantChange: HandleAnswerVariantChangeType
    addVariant: AddVariantType
  },
  () => void
]

const initialState = { title: '', questions: [] }

export const useFormCreator = <T extends string>(
  formatQuestionsToSubmit: FormatQuestionsToSubmitType
): UseFormCreatorHookTurple<T> => {
  const [form, setState] = useState<Form<T>>(initialState)

  const [
    doFormCreation,
    { error: submitError, data: submitData, loading: submitLoading },
  ] = useMutation<ICreateFormMutation, MutationCreateFormArgs>(CREATEFORM, {
    variables: {
      title: form.title,
      questions: formatQuestionsToSubmit<T>(form.questions),
    },
  })

  const formSubmit: FormSubmitType = async (e) => {
    e.preventDefault()
    try {
      await doFormCreation()
    } catch (err) {}
  }

  const handleFormTitleChange: HandleFormTitleChangeType = (e) => {
    const title = e.currentTarget.value
    setState((prev) => ({ ...prev, title }))
  }

  const createQuestion: CreateQuestionType<T> = (type) => {
    setState(({ title, questions }) => ({
      title,
      questions: questions.concat({ title: '', type, variants: [''] }),
    }))
  }

  const handleQuestionTitleChange: HandleQuestionTitleChangeType = (
    questionNumber,
    e
  ) => {
    const questionTitle = e.currentTarget.value
    setState(({ title, questions }) => ({
      title,
      questions: questions.map((el, index) =>
        index === questionNumber ? { ...el, title: questionTitle } : el
      ),
    }))
  }

  const handleAnswerVariantChange: HandleAnswerVariantChangeType = (
    questionNumber,
    variantNumber,
    e
  ) => {
    const variantText = e.currentTarget.value
    setState(({ title, questions }) => ({
      title,
      questions: questions.map((question, questionIndex) =>
        questionIndex === questionNumber
          ? {
              ...question,
              variants: question.variants.map((variant, variantIndex) =>
                variantIndex === variantNumber ? variantText : variant
              ),
            }
          : question
      ),
    }))
  }

  const addVariant: AddVariantType = (questionNumber) => {
    setState(({ title, questions }) => ({
      title,
      questions: questions.map((el, index) => ({
        ...el,
        variants:
          index === questionNumber ? el.variants.concat('') : el.variants,
      })),
    }))
  }

  const resetForm = () => {
    setState(initialState)
  }

  return [
    form,
    [formSubmit, { submitData, submitError, submitLoading }],
    {
      handleFormTitleChange,
      addQuestion: createQuestion,
      handleQuestionTitleChange,
      handleAnswerVariantChange,
      addVariant,
    },
    resetForm,
  ]
}
