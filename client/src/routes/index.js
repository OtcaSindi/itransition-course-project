import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'

import UsersPage from '../pages/users-page/users-page'
import MainPage from '../pages/MainPage'
import CollectionsPage from "../pages/collections-page"
import CollectionPage from "../pages/collection-page"
import AuthModal from "../components/modals/auth-modal"
import {AuthContext} from "../context/AuthContext"
import {Redirect} from "react-router"

const Routes = ({isAuthenticated, userIsAdmin}) => {

    const {openModal} = useContext(AuthContext)

    return (
        <>
            {!isAuthenticated && openModal && <AuthModal/>}
            <Switch>
                <Route path="/news" exact component={MainPage}/>

                {isAuthenticated && userIsAdmin && <Route path="/users" exact component={UsersPage}/>}

                {isAuthenticated && userIsAdmin && <Route path="/users/:id" exact
                                                          render={({match}) => (
                                                              <CollectionsPage idUser={(match.params.id)}/>)}/>}

                <Route path="/collections" exact render={() => (<CollectionsPage/>)}/>

                {isAuthenticated && <Route path="/collections/:id" exact
                                           render={({match}) => (<CollectionPage collectionId={match.params.id}/>)}/>}

                <Redirect to="/news"/>
            </Switch>
        </>
    )
}

export default Routes