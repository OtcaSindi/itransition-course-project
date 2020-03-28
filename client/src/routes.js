import React, {useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {FileUploaderDropContainer} from "carbon-components-react"

import UsersPage from './pages/UsersPage'
import RegPage from './pages/RegPage'
import AuthPage from "./pages/AuthPage"
import CollectionsPage from "./pages/CollectionsPage"
import {create} from "./services"
import {useAuth} from "./hooks/auth.hook"
import CollectionPage from "./pages/CollectionPage"
import LaunchModal from "./components/launch-modal"

import {MODAL_HEADER_CREATE, MODAL_LABEL_ITEMS} from "./constants"

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

const Comp = () => {
    const [open, setOpen] = React.useState(false)
    const [image, setImage] = useState(null)
    return (
        <>
            <button onClick={() =>setOpen(true)}>Hello</button>
            <LaunchModal
                modalLabel={MODAL_LABEL_ITEMS}
                modalHeading={MODAL_HEADER_CREATE}
                primaryButtonText="Create"
                secondaryButtonText="Cancel"
                select={select}
                inputsText={inputsText}
                open={open}
                setOpen={setOpen}
                FileUploaderImage
            />
        </>
    )
}

export const useRoutes = isAuthenticated => {

    const {token, userIsAdmin} = useAuth()

    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/test"
                       exact
                       component={Comp}
                />


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
                            create().createItem(token, {ititle: 'ABC',})
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
