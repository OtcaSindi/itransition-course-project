import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import UsersPage from './pages/UsersPage'
import RegPage from './pages/RegPage'
import AuthPage from "./pages/AuthPage"
import CollectionsPage from "./pages/CollectionsPage"
import CollectionPage from "./pages/collection-page"
import {useAuth} from "./hooks/use-auth"

const inputsText = [
    {
        id: 'id1',
        type: 'text',
        value: 'value',
        onChange: console.log,
        labelText: 'Title',
        invalid: false,
        invalidText: 'invalidText',
    },
    {
        id: 'id2',
        type: 'area',
        value: 'value',
        onChange: console.log,
        labelText: 'Description',
        invalid: false,
        invalidText: 'invalidText',
    },
]

const select = {
    id: 'select-1',
    defaultValue: 'option-2',
    labelText: 'Select',
    selectItems: [
        {
            value: 'option-1',
            text: 'Option-1'
        },
        {
            value: 'option-2',
            text: 'Option-2'
        },
        {
            value: 'option-3',
            text: 'Option-3'
        },
    ]
}

export const useRoutes = isAuthenticated => {

    const {userIsAdmin} = useAuth()

    if (isAuthenticated) {
        return (
            <Switch>

                {userIsAdmin && <Route path="/users" exact component={UsersPage}/>}

                <Route path="/collections" exact component={CollectionsPage}/>

                {userIsAdmin && <Route path="/users/:id" exact
                                       render={({match}) => (<CollectionsPage idUser={(match.params.id)}/>)}/>}

                <Route path="/collections/:id" exact
                       render={({match}) => (<CollectionPage collectionId={match.params.id}/>)}/>

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
