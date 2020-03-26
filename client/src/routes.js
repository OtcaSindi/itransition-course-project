import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import UsersPage from './pages/UsersPage'
import RegPage from './pages/RegPage'
import AuthPage from "./pages/AuthPage"
import CollectionsPage from "./pages/CollectionsPage"
import {create} from "./services"
import {useAuth} from "./hooks/auth.hook"
import CollectionPage from "./pages/CollectionPage"

export const useRoutes = isAuthenticated => {

    const {token, userIsAdmin} = useAuth()

    if (isAuthenticated) {
        return (
            <Switch>
                {userIsAdmin && <Route path="/users" exact component={UsersPage}/>}

                <Route path="/collections" exact component={CollectionsPage}/>

                {userIsAdmin && <Route path="/users/:id" exact
                       render={({match}) => (<CollectionsPage idUser={(match.params.id)}/>)}/>}

                <Route path="/collections/:id" exact
                       render={({match}) => (<CollectionPage collectionId={match.params.id}/>)}/>

                <Route path='/create-item' render={() => {
                    return (
                        <button onClick={() => {
                            console.log(token)
                            create().createItem(token, {ititle: 'ABC', })
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
