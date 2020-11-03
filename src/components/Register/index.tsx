import { useMutation } from '@apollo/client'
import React, { FormEvent } from 'react'
import { Redirect } from 'react-router-dom'

import { REGISTER } from '../../apollo'
import { MutationRegisterArgs, ServerAnswer } from '../../apollo/typeDefs.gen'
import styles from '../Login/main.module.css'
import meme from './meme.jpg'

interface IRegisterMutation {
  register: ServerAnswer
}

const Register: React.FC = () => {
  const [doRegister, { data, loading, error }] = useMutation<
    IRegisterMutation,
    MutationRegisterArgs
  >(REGISTER)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    try {
      await doRegister({
        variables: {
          email: formData.get('email') as string,
          name: formData.get('name') as string,
        },
      })
    } catch (err) {}
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <img
          className={styles.img}
          src={meme}
          alt='Questionform says: "Is mailbox a password?"'
        />
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.header}>Register</h1>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="email"
          />
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="username"
          />
          {loading ? (
            'Loading...'
          ) : (
            <input className={styles.button} type="submit" value="Submit" />
          )}
          {error && <p className={styles.errorMsg}>{error.message}</p>}
          {data?.register.success && <Redirect to="/" />}
        </form>
      </div>
    </div>
  )
}

export default Register
