import { useMutation, useQuery } from '@apollo/client'
import React, { FormEvent, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { FORM, FORMSUBMIT } from '../../apollo'
import {
  ChoiseAnswer,
  ChoisesQuestion,
  Form,
  InputAnswer,
  InputQuestion,
  QueryFormArgs,
} from '../../apollo/typeDefs.gen'
import Lists from './Lists'

interface IFormQuery {
  form: Form
}

const DoForm: React.FC = () => {
  const { id: idString } = useParams<{ id: string }>()

  const id = parseInt(idString)

  const { data, error, loading } = useQuery<IFormQuery, QueryFormArgs>(FORM, {
    variables: { id },
    skip: isNaN(id),
  })

  const [
    doFormSubmit,
    { error: submitError, data: submitData, loading: submitLoading },
  ] = useMutation(FORMSUBMIT)

  const [answers, setAnswer] = useState<(InputAnswer | ChoiseAnswer)[]>([])

  const getInitialState = (data: IFormQuery) => {
    if (data && data.form) {
      return data.form.questions.flatMap<InputAnswer | ChoiseAnswer>(
        (el: InputQuestion | ChoisesQuestion) => {
          if (el.__typename === 'ChoisesQuestion')
            return [
              { __typename: 'ChoiseAnswer', type: 'CHOISE', userChoise: -1 },
            ]
          if (el.__typename === 'InputQuestion')
            return [{ __typename: 'InputAnswer', type: 'INPUT', userInput: '' }]
          return []
        }
      )
    }
    return []
  }

  useEffect(() => {
    if (data) {
      const initialState = getInitialState(data)
      setAnswer(initialState)
    }
  }, [data])

  useEffect(() => console.log(answers), [answers])

  if (isNaN(id)) return <Redirect to="/" />

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const { form } = data!

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Submited form:', answers)

    answers.forEach((el) => {
      delete el.__typename
    })

    const submitAnswers = JSON.stringify(answers)

    console.log('Filtered answers: ', submitAnswers)

    doFormSubmit({
      variables: {
        formId: id,
        answers: submitAnswers,
      },
    })
  }

  const answerChange = (num: number) => {
    return (value: number | string) => {
      setAnswer((prev) => {
        return prev.map((el, index) => {
          if (index === num) {
            if (el.__typename === 'ChoiseAnswer' && typeof value === 'number')
              return { ...el, userChoise: value }
            if (el.__typename === 'InputAnswer' && typeof value === 'string')
              return { ...el, userInput: value }
          }
          return el
        })
      })
    }
  }

  return (
    <div>
      <h1>{form.title}</h1>
      <p>{form.dateCreated}</p>
      <h3>{form.author?.name || 'No author'}</h3>

      <form onSubmit={handleSubmit}>
        <ul>
          {form.questions.map((el: InputQuestion | ChoisesQuestion) => {
            if (el.__typename === 'InputQuestion')
              return (
                <li key={el.number}>
                  <label>
                    {el.title}
                    <input
                      onChange={(e) =>
                        answerChange(el.number)(e.currentTarget.value)
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
                          answerChange(el.number)(selectValue)
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
                        onChange={answerChange(el.number)}
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
      {submitData && submitData.formSubmit && submitData.formSubmit.success && (
        <p>Successfully uploaded</p>
      )}
    </div>
  )
}

export default DoForm
