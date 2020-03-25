import React, {useContext, useEffect, Fragment} from "react"
import {useDispatch, useSelector} from 'react-redux'

import {AuthContext} from "../context/AuthContext"
import Loader from "../components/loader"
import UsersList from "../components/users-list"
import {usersError, usersLoaded, usersRequested} from "../actionsCreator"
import Toolbar from "../components/toolbar"
import {create} from "../services"

export {create} from '../services'

const UsersPage = () => {
    const {users, loading, error} = useSelector(({usersReducer}) => usersReducer)
    const {token, logout} = useContext(AuthContext)
    const dispatch = useDispatch()

    useEffect(() => {
        const foo = async () => {
            try {
                dispatch(usersRequested())
                const data = await create().getUsers(token)
                dispatch(usersLoaded(data.data))
            } catch (e) {
                dispatch(usersError(e))
                if (e.message === 'No authorization.') {
                    logout()
                }
            }
        }

        foo()

    }, [dispatch, logout, token])

    if (loading) {
        return <Loader/>
    }

    if (error) {
        console.log(error)
        return <div className="center">Unexpected error. Please try again.</div>
    }

    return (
        <Fragment>
            <Toolbar/>
            <UsersList users={users}/>
        </Fragment>
    )
}

export default UsersPage

