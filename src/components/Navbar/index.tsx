import React from 'react'
import { Link } from 'react-router-dom'
import styles from './main.module.css'
import logo from './logo.svg'

const Navbar: React.FC = () => (
  <nav className={styles.nav}>
    <Link to="/" className={styles.logo}>
      <img src={logo} alt="" className={styles.logo} />
    </Link>
  </nav>
)

export default Navbar
