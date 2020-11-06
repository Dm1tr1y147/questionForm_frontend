import React, { FormEvent, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { MutationFormSubmitArgs } from '../../apollo/typeDefs.gen'
import { FORMSUBMIT } from '../../apollo'
import Lists from '../FormLists'
import { useForm } from './hooks'
import { QuestionT } from '../../types'
import { RefetchQuestionsFT, IFormSubmitMutation } from './types'
import styles from './main.module.css'

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
                <li key={el.number} className={styles.question}>
                  <label
                    className={styles.questionTitle}
                    htmlFor={el.title.replace(' ', '_')}
                  >
                    {el.title}
                  </label>
                  <input
                    className={styles.textInput}
                    placeholder="Input"
                    name={el.title.replace(' ', '_')}
                    onChange={(e) =>
                      changeAnswer(el.number)(e.currentTarget.value)
                    }
                    type="text"
                  />
                </li>
              )
            if (el.__typename === 'ChoisesQuestion')
              return (
                <li key={el.number} className={styles.question}>
                  <label className={styles.questionTitle} htmlFor={el.title}>
                    {el.title}
                  </label>
                  {el.type === 'SELECT' ? (
                    <select
                      className={styles.select}
                      onChange={(e) => {
                        const selectValue = el.variants.findIndex(
                          (val) => val.text === e.currentTarget.value
                        )
                        changeAnswer(el.number)(selectValue)
                      }}
                      name={el.title.replace(' ', '_')}
                    >
                      {el.variants.map((option, index) => (
                        <option key={index}>{option.text}</option>
                      ))}
                    </select>
                  ) : (
                    <Lists
                      variants={el.variants}
                      onChange={changeAnswer(el.number)}
                      name={el.title.replace(' ', '_')}
                      type={el.type}
                    />
                  )}
                </li>
              )
            return <li className={styles.question}>Unknown question type</li>
          })}
        </ul>
        {submitLoading ? (
          <p>Uploading...</p>
        ) : (
          <input className={styles.button} type="submit" />
        )}
      </form>
      {submitError && <p>{submitError.message}</p>}
      {submitData?.formSubmit.success && <p>Successfully uploaded</p>}
    </>
  )
}

export default QuestionsForm
