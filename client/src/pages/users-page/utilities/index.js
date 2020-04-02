import map from "lodash/fp/map"
import {Delete16, Blockchain16, } from '@carbon/icons-react'
import {useHistory} from "react-router"

import {BLOCKED, NOT_BLOCKED, ADMIN, USER} from '../../../constants'
import UserActionModal from "../../../components/modals/user-action-modal"
import {blockById, deleteById, makeAdminById, unblockById} from "../../../services"
import {OverflowMenuItem} from "carbon-components-react"
import React from "react"
import {useAuth} from "../../../hooks/use-auth"
import {AuthContext} from "../../../context/AuthContext"

const headersItems = [
    {
        header: 'ID',
        key: 'id'
    },
    {
        header: 'Name',
        key: 'name'
    },
    {
        header: 'email',
        key: 'email'
    },
    {
        header: 'Status',
        key: 'status'
    },
    {
        header: 'Rank',
        key: 'rank'
    },
]

const batchActions = [
    {
        name: 'Block',
        image: Blockchain16
    },
    {
        name: 'Unblock',
        image: ''
    },
    {
        name: 'Delete',
        image: Delete16
    },
    {
        name: 'MakeAdmin',
        image: ''
    },

]

const overflowActions = [
    {
        name: 'Block'
    },
    {
        name: 'Unblock'
    },
    {
        name: 'Delete'
    },
    {
        name: 'MakeAdmin'
    },
]

const initialRowsMapper = map(({id, name, email, blocked, isAdmin}) => {
    return {
        id,
        name,
        email,
        status: blocked ? BLOCKED : NOT_BLOCKED,
        rank: isAdmin ? ADMIN : USER
    }
})

const renderUserModals = {
    Block: UserActionModal,
    Unblock: UserActionModal,
    Delete: UserActionModal,
    MakeAdmin: UserActionModal,
}

const selectUserRequest = (action) => {
    switch (action) {
        case 'Block':
            return blockById
        case 'Unblock':
            return unblockById
        case 'Delete':
            return deleteById
        case 'MakeAdmin':
            return makeAdminById
        default:
            return null
    }
}

const OverflowActionInfoUserComponent = ({id}) => {
    const history = useHistory()
    const {userId} = useAuth(AuthContext)

    const historyPush = (id) => () => {
        if (userId === id) {
            history.push('/collections')
        } else {
            history.push(`/users/${id}`)
        }
    }

    return (
        <OverflowMenuItem
            key="Info"
            itemText="Info"
            onClick={historyPush(id)}
        />
    )

}


export {
    headersItems,
    batchActions,
    overflowActions,
    initialRowsMapper,
    renderUserModals,
    selectUserRequest,
    OverflowActionInfoUserComponent
}