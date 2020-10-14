import React from 'react'
import { Redirect } from 'react-router-dom'
import { useURLQuery } from '../../hooks'

const Authorize: React.FC = () => {
  const query = useURLQuery()

  const token = query.get('token')

  if (token) localStorage.setItem('token', token)

  return <Redirect to="/" />
}

export default Authorize
