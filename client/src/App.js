import React, {useState} from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {Provider} from 'react-redux'

import 'materialize-css'

import Routes from '../src/routes'
import {useAuth} from "./hooks/use-auth"
import {AuthContext} from "./context/AuthContext"
import NavBar from './components/navbar/navbar'
import store from "./store"
import {NotificationsProvider} from "./portals/notification-portal"
import {useOpenAuthModal} from "./hooks/use-open-auth-modal"


const App = () => {
    const {token, login, logout, userId, userIsAdmin} = useAuth()
    const {openModal, setOpenModal} = useOpenAuthModal()
    const isAuthenticated = !!token

    const [searchItems, setSearchItems] = useState('')

    return (
        <NotificationsProvider>
            <Provider store={store}>
                <AuthContext.Provider value={{
                    token, login, logout, userId, isAuthenticated,
                    userIsAdmin, openModal, setOpenModal, searchItems, setSearchItems
                }}>
                    <Router>
                        <NavBar/>
                        <Routes isAuthenticated={isAuthenticated} userIsAdmin={userIsAdmin}/>
                    </Router>
                </AuthContext.Provider>
            </Provider>
        </NotificationsProvider>
    )
}

export default App
