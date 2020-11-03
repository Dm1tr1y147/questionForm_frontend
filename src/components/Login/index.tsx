import { useMutation } from '@apollo/client'
import React, { ChangeEvent, FormEvent, useState } from 'react'

import { LOGIN } from '../../apollo'
import { MutationLoginArgs, ServerAnswer } from '../../apollo/typeDefs.gen'
import styles from './main.module.css'
import meme from './meme.png'

interface ILoginMutation {
  login: ServerAnswer
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')

  const [doLogin, { error, data, loading }] = useMutation<
    ILoginMutation,
    MutationLoginArgs
  >(LOGIN)

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await doLogin({ variables: { email } })
    } catch (err) {}
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <img
          className={styles.img}
          src={meme}
          alt="You can't forget password if you don't have it"
        />
        <form className={styles.form} onSubmit={handleFormSubmit}>
          {data?.login.success ? (
            <div>
              <h1>
                You will get <span className={styles.focus}>login link</span>{' '}
                <br /> in your <span className={styles.focus}>mailbox</span>
              </h1>
            </div>
          ) : (
            <>
              <h1 className={styles.header}>Login</h1>
              <input
                className={styles.input}
                name="email"
                id="email"
                type="email"
                placeholder="email"
                onChange={handleInputChange}
              />
              {loading ? (
                'Loading...'
              ) : (
                <input type="submit" value="Login" className={styles.button} />
              )}
              {error && <p className={styles.errorMsg}>{error.message}</p>}
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
