import React from 'react'
import { Link } from 'react-router-dom'

import styles from './main.module.css'

interface props {
  title: string
  subtitle?: string
  icon?: React.Component
  iconCounter?: number
  id: number
}

const Card: React.FC<props> = ({ title, subtitle, id }) => {
  return (
    <Link to={`/form/${id}`} className={styles.card}>
      <h3>{title}</h3>
      {subtitle ?? <h5>{subtitle}</h5>}
    </Link>
  )
}

export default Card
