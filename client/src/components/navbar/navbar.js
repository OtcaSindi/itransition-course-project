import React, {useCallback, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {useHistory} from 'react-router'
import flow from 'lodash/flow'
import property from 'lodash/property'

import {AuthContext} from "../../context/AuthContext"

import styles from './narbar.module.css'

const Navbar = () => {

    const {
        isAuthenticated,
        logout,
        userIsAdmin,
        setOpenModal,
        searchItems,
        setSearchItems
    } = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = async () => {
        await logout()
        history.push('/')
    }

    const setVal = useCallback(flow([
        property('target.value'),
        setSearchItems,
    ]), [setSearchItems])

    return (
        <div className={styles.navbar}>
            <input className={styles.searchPanel}
                type="text"
                name="search"
                value={searchItems}
                onChange={setVal}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        history.push(`/home?search=${searchItems.replace(' ', '+')}`)
                    }
                }}
            />
            <NavLink to="/home" className={styles.navLink}>Home</NavLink>
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
