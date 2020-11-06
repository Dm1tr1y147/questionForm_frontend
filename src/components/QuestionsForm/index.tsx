import React, { FormEvent, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { MutationFormSubmitArgs } from '../../apollo/typeDefs.gen'
import { FORMSUBMIT } from '../../apollo'
import Lists from '../FormLists'
import { useForm } from './hooks'
import { QuestionT } from '../../types'
import { RefetchQuestionsFT, IFormSubmitMutation } from './types'

interface IQuestionsFormProps {
  formId: number
  questions: QuestionT[]
  refetchQuestions: RefetchQuestionsFT
}

const QuestionsForm: React.FC<IQuestionsFormProps> = ({
  formId,
  questions,
  refetchQuestions,
}) => {
  const [
    doFormSubmit,
    { error: submitError, data: submitData, loading: submitLoading },
  ] = useMutation<IFormSubmitMutation, MutationFormSubmitArgs>(FORMSUBMIT)

  const {
    answers,
    changeAnswer,
    setInitialState: setInitialFromState,
  } = useForm()

  useEffect(() => setInitialFromState(questions), [
    questions,
    setInitialFromState,
  ])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    answers.forEach((el) => {
      delete el.__typename
    })

    try {
      const submitAnswers = JSON.stringify(answers)

      await doFormSubmit({
        variables: {
          formId,
          answers: submitAnswers,
        },
      })
      await refetchQuestions()
    } catch (err) {}
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ul>
          {questions.map((el: QuestionT) => {
            if (el.__typename === 'InputQuestion')
              return (
                <li key={el.number}>
                  <label>
                    {el.title}
                    <input
                      onChange={(e) =>
                        changeAnswer(el.number)(e.currentTarget.value)
                      }
                      type="text"
                    />
                  </label>
                </li>
              )
            if (el.__typename === 'ChoisesQuestion')
              return (
                <li key={el.number}>
                  <label>
                    {el.title}
                    {el.type === 'SELECT' ? (
                      <select
                        onChange={(e) => {
                          const selectValue = el.variants.findIndex(
                            (val) => val.text === e.currentTarget.value
                          )
                          changeAnswer(el.number)(selectValue)
                        }}
                        name={el.title}
                      >
                        {el.variants.map((option, index) => (
                          <option key={index}>{option.text}</option>
                        ))}
                      </select>
                    ) : (
                      <Lists
                        variants={el.variants}
                        onChange={changeAnswer(el.number)}
                        name={el.title}
                        type={el.type}
                      />
                    )}
                  </label>
                </li>
              )
            return <li>Unknown question type</li>
          })}
        </ul>
        {submitLoading ? <p>Uploading...</p> : <input type="submit" />}
      </form>
      {submitError && <p>{submitError.message}</p>}
      {submitData?.formSubmit.success && <p>Successfully uploaded</p>}
    </>
  )
}

export default QuestionsForm
