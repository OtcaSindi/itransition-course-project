import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {useHistory} from 'react-router'

import {AuthContext} from "../../context/AuthContext"

import styles from './narbar.module.css'

const Navbar = () => {

    const {isAuthenticated, logout, userIsAdmin, setOpenModal} = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = async () => {
        await logout()
        history.push('/')
    }

    return (
        <div className={styles.navbar}>
            {userIsAdmin && <NavLink to="/users" className={styles.navLink}>Users</NavLink>}
            {
                isAuthenticated ?
                    <NavLink to="/collections" className={styles.navLink}>My collections</NavLink> :
                    <a href="/" onClick={(e) => {
                        e.preventDefault()
                        setOpenModal(true)
                    }}
                       className={styles.navLink}
                    >
                        My collections
                    </a>
            }
            <NavLink to="/news" className={styles.navLink}>News</NavLink>
            {
                isAuthenticated ?
                    <a href="/" className={styles.navLink} onClick={logoutHandler}>Log out</a> :
                    <a href="/" onClick={(e) => {
                        e.preventDefault()
                        setOpenModal(true)
                    }}
                       className={styles.navLink}
                    >
                        Log in
                    </a>
            }
        </div>
    )
}

export default Navbar
