import React from 'react'
import { useQuery } from '@apollo/client'

import Card from '../Card'
import { USER } from '../../apollo'
import { QueryUserArgs, User } from '../../apollo/typeDefs.gen'
import styles from './main.module.css'
import { Redirect } from 'react-router-dom'

interface IUserQuery {
  user: User
}

const Home: React.FC = () => {
  const { data, error, loading } = useQuery<IUserQuery, QueryUserArgs>(USER)
  if (loading) return <p>Loading...</p>

  if (error?.message === 'Authorization required')
    return <Redirect to="/login" />

  if (error) return <p>{error.message}</p>

  const { user } = data!

  const { forms } = user

  return (
    <div className={styles.container}>
      <ul className={styles.leftPad}>
        {forms!.map((form, formIndex) => (
          <li key={formIndex}>
            <Card title={form.title} id={form.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
