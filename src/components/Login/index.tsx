import { useMutation } from '@apollo/client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { LOGIN } from '../../apollo'
import { MutationLoginArgs, ServerAnswer } from '../../apollo/typeDefs.gen'

interface ILoginMutation {
  login: ServerAnswer
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')

  const [doLogin, { error, data }] = useMutation<
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
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" onChange={handleInputChange} />
        <input type="submit" value="Login" />
      </form>
      {error && error.message}
      {data && data.login && data.login.success && <Redirect to="/" />}
    </div>
  )
}

export default Login
