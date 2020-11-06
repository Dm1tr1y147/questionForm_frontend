import { useQuery } from '@apollo/client'
import React from 'react'
import { Redirect } from 'react-router-dom'

import { FORM } from '../../apollo'
import { QueryFormArgs } from '../../apollo/typeDefs.gen'
import SubmissionList from '../../components/SubmissionsList'
import styles from './main.module.css'
import QuestionsForm from '../../components/QuestionsForm'
import { IFormQuery } from '../../types'
import { useId } from './hooks'
import { getDateCreated } from '../../utils'

const DoForm: React.FC = () => {
  const id = useId()

  const { data, error, loading, refetch: refetchForm } = useQuery<
    IFormQuery,
    QueryFormArgs
  >(FORM, {
    variables: { id },
    skip: isNaN(id),
  })

  if (isNaN(id)) return <Redirect to="/" />

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const { form } = data!

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.formTitle}>{form.title}</h1>
        <p className={styles.dateCreated}>
          Published on {getDateCreated(form.dateCreated)}
        </p>
        <p className={styles.author}>
          {'by ' + form.author?.name || 'No author'}
        </p>
      </header>
      <main className={styles.main}>
        <div className={styles.mainTop}></div>
        {form.submissions ? (
          <>
            <h1 className={styles.mainHeader}>Submissions</h1>
            <SubmissionList
              submissions={form.submissions}
              questions={form.questions!}
            />
          </>
        ) : (
          <>
            <h1 className={styles.mainHeader}>Questions</h1>
            <QuestionsForm
              formId={id}
              questions={data!.form.questions!}
              refetchQuestions={refetchForm}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default DoForm
