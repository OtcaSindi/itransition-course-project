import React, {Fragment, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {useHistory} from 'react-router'

import {Navbar, Icon, NavItem} from 'react-materialize'
import {AuthContext} from "../../context/AuthContext"

const Navbar1 = () => {

    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = async (e) => {
        e.preventDefault()
        await auth.logout()
        history.push('/')
    }
    return (
        <nav className="fixed-navbar">
            <div className="nav-wrapper blue darken-1">
                <div className="nav-wrapper blue darken-1 navbar-center">
                    <NavLink to="/notes" className="brand-logo center">Items</NavLink>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i
                        className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><NavLink to="/users">Users</NavLink></li>
                        <li><NavLink to="/collections">My collections</NavLink></li>
                    </ul>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/news">News</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar1
