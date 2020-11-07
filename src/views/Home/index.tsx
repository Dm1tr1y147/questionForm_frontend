import React from 'react'
import { useQuery } from '@apollo/client'
import { generateFromString } from 'generate-avatar'
import { Redirect, useHistory, Link } from 'react-router-dom'

import Card from '../../components/Card'
import { USER } from '../../apollo'
import { QueryUserArgs } from '../../apollo/typeDefs.gen'
import styles from './main.module.css'
import { IUserQuery } from '../../types'
import { logOut } from './utils'

const Home: React.FC = () => {
  let { data, error, loading, refetch } = useQuery<IUserQuery, QueryUserArgs>(
    USER
  )

  const history = useHistory()

  if (loading) return <p>Loading...</p>

  if (error?.message === 'Authorization required')
    return <Redirect to="/login" />

  if (error) return <p>{error.message}</p>

  const { user } = data!

  const { forms, formSubmissions } = user

  return (
    <div className={styles.container}>
      <div className={styles.userPad}>
        <div className={styles.userCard}>
          <img
            className={styles.userPic}
            src={`data:image/svg+xml;utf8,${generateFromString(user.email)}`}
            alt="Userpic"
          />
          <h1>{user.name}</h1>
          <button
            className={styles.button}
            onClick={() => logOut(refetch, history)}
          >
            Log out
          </button>
        </div>
      </div>

      <div className={styles.leftPad}>
        <h1>My forms</h1>
        <ul className={styles.cardList}>
          {forms!.map((form) => (
            <li key={form.id}>
              <Card title={form.title} id={form.id} />
            </li>
          ))}
          <Link className={styles.createNew} to="/create">
            <span>Create new</span> <h3>+</h3>
          </Link>
        </ul>
      </div>

      <div className={styles.rightPad}>
        <h1>My submissions</h1>
        <ul className={styles.cardList}>
          {formSubmissions
            ?.filter((submission) => Boolean(submission.form))
            .map((submission) => (
              <li key={submission.id}>
                <Card
                  title={submission.form!.title}
                  id={submission.form!.id}
                  subtitle={
                    submission.user ? 'by ' + submission.user.name : undefined
                  }
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
