import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {Provider} from 'react-redux'

import 'materialize-css'

import {useRoutes} from "./routes"
import {useAuth} from "./hooks/use-auth"
import {AuthContext} from "./context/AuthContext"
import NavBar from './components/navbar/navbar'
import Loader from "./components/loader/loader"
import store from "./store"
import {NotificationsProvider} from "./portals/notification-portal"

const App = () => {
    const {token, login, logout, userId, userIsAdmin, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader/>
    }

    return (
        <NotificationsProvider>
            <Provider store={store}>
                <AuthContext.Provider value={{
                    token, login, logout, userId, isAuthenticated, userIsAdmin
                }}>

                    <Router>
                        {isAuthenticated && <NavBar/>}
                        <div className="container">
                            {routes}
                        </div>
                    </Router>
                </AuthContext.Provider>
            </Provider>
        </NotificationsProvider>
    )
}

export default App
