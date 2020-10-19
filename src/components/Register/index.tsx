import { useMutation } from '@apollo/client'
import React, { FormEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { REGISTER } from '../../apollo'
import { MutationRegisterArgs, ServerAnswer } from '../../apollo/typeDefs.gen'

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
    <div>
      Register
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="email" />
        <input type="text" name="name" placeholder="username" />
        {loading ? 'Loading...' : <input type="submit" value="Submit" />}
        {error && error.message}
        {data && data.register && data.register.success && <Redirect to="/" />}
      </form>
    </div>
  )
}

export default Register
