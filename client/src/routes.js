import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import UsersPage from './pages/UsersPage'
import RegPage from './pages/RegPage'
import AuthPage from "./pages/AuthPage"
import CollectionsPage from "./pages/CollectionsPage"
import {create} from "./services"
import {useAuth} from "./hooks/auth.hook"

export const useRoutes = isAuthenticated => {

    const {token} = useAuth()

    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/users" exact component={UsersPage}/>
                <Route path="/collections" exact component={CollectionsPage}/>
                <Route path="/collections/:id" exact
                       render={({match}) => (<CollectionsPage idUser={(match.params.id)}/>)}/>
                <Route path='/create-item' render={() => {
                    return (
                        <button onClick={() => {
                            console.log(token)
                            create().createItem(token, {title: 'ABC', someObject: {a: 1, b: 2}})
                        }}>Click</button>
                    )
                }}/>
                <Redirect to="/collections"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact component={AuthPage}/>
            <Route path="/register" exact component={RegPage}/>

            <Redirect to="/"/>
        </Switch>
    )
}
