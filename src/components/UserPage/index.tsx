import { useQuery } from '@apollo/client'
import React from 'react'
import { USER } from '../../apollo'
import { User } from '../../apollo/typeDefs.gen'

interface UserQuery {
  user: User
}

const UserPage: React.FC = () => {
  const { data, error, loading } = useQuery<UserQuery>(USER)
  if (loading) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  const { user } = data!

  return (
    <div>
      <h1>Username: {user.name}</h1>
      <h3>Email: {user.email}</h3>
      <p>User ID: {user.id}</p>
      {user.forms && (
        <>
          <h2>Forms list</h2>
          <ul>
            {user.forms.map((form, index) => (
              <li key={index}>
                <a href={`http://localhost:3000/form/${form.id}`}>
                  {form.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default UserPage
