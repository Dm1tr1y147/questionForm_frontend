import { useQuery } from '@apollo/client'
import React from 'react'
import { USER } from '../../apollo'

const UserPage: React.FC = () => {
  const { data, error, loading } = useQuery(USER)
  if (loading) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  const { name, email, id } = data.user

  return (
    <div>
      <h1>Username: {name}</h1>
      <h3>Email: {email}</h3>
      <p>User ID: {id}</p>
    </div>
  )
}

export default UserPage
