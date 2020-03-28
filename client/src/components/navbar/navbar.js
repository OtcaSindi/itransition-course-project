import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {useHistory} from 'react-router'

import {AuthContext} from "../../context/AuthContext"

import styles from './narbar.module.css'

const Navbar = () => {

    const {logout, userIsAdmin} = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = async (e) => {
        await logout()
        history.push('/')
    }
    return (
            <nav className={styles.navbar}>
                {userIsAdmin && <NavLink to="/users" className={styles.navLink}>Users</NavLink>}
                <NavLink to="/collections" className={styles.navLink}>My collections</NavLink>
                <NavLink to="/news" className={styles.navLink}>News</NavLink>
                <a href="/" className={styles.navLink} onClick={logoutHandler}>Logout</a>
            </nav>
    )
}

export default Navbar
