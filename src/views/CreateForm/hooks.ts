import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { CREATEFORM } from '../../apollo'
import { MutationCreateFormArgs } from '../../apollo/typeDefs.gen'
import {
  FormatQuestionsToSubmitFT,
  UseFormCreatorHookTurpleT,
  FormT,
  ICreateFormMutation,
  FormSubmitT,
  HandleFormTitleChangeFT,
  CreateQuestionFT,
  HandleQuestionTitleChangeFT,
  HandleAnswerVariantChangeFT,
  AddVariantFT,
  RemoveQuestionFT,
} from './types'

const initialState = { title: '', questions: [] }

export const useFormCreator = <T extends string>(
  formatQuestionsToSubmit: FormatQuestionsToSubmitFT
): UseFormCreatorHookTurpleT<T> => {
  const [form, setState] = useState<FormT<T>>(initialState)

  const [
    doFormCreation,
    { error: submitError, data: submitData, loading: submitLoading },
  ] = useMutation<ICreateFormMutation, MutationCreateFormArgs>(CREATEFORM, {
    variables: {
      title: form.title,
      questions: formatQuestionsToSubmit<T>(form.questions),
    },
  })

  const formSubmit: FormSubmitT = async (e) => {
    e.preventDefault()
    try {
      await doFormCreation()
    } catch (err) {}
  }

  const handleFormTitleChange: HandleFormTitleChangeFT = (e) => {
    const title = e.currentTarget.value
    setState((prev) => ({ ...prev, title }))
  }

  const createQuestion: CreateQuestionFT<T> = (type) => {
    setState(({ title, questions }) => ({
      title,
      questions: questions.concat({ title: '', type, variants: [''] }),
    }))
  }

  const removeQuestion: RemoveQuestionFT = (number) => {
    setState(({ title, questions }) => ({
      title,
      questions: questions.filter((_, index) => index !== number),
    }))
  }

  const handleQuestionTitleChange: HandleQuestionTitleChangeFT = (
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

  const handleAnswerVariantChange: HandleAnswerVariantChangeFT = (
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

  const addVariant: AddVariantFT = (questionNumber) => {
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
      removeQuestion,
      handleQuestionTitleChange,
      handleAnswerVariantChange,
      addVariant,
    },
    resetForm,
  ]
}
