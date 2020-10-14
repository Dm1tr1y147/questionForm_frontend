import { useQuery } from '@apollo/client'
import React from 'react'
import { USER } from '../../apollo'

const UserPage: React.FC = () => {
  const { data, error, loading } = useQuery(USER)
  if (loading) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  console.log(Object.entries(data.user))

  const user = Object.entries(data.user).map((el, index) => (
    <li key={index}>
      {el[0]}: {el[1]}
    </li>
  ))

  return <ul>{user}</ul>
}

export default UserPage
