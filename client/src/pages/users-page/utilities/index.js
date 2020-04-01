import map from "lodash/fp/map"
import {BLOCKED, NOT_BLOCKED, ADMIN, USER} from '../../../constants'
import UserActionModal from "../../../components/modals/user-action-modal"
import axiosRequest from "../../../services"

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
            return axiosRequest.blockById
        case 'Unblock':
            return axiosRequest.unblockById
        case 'Delete':
            return axiosRequest.deleteById
        case 'MakeAdmin':
            return axiosRequest.makeAdminById
        default:
            return null
    }
}

export {
    headersItems,
    batchActions,
    overflowActions,
    initialRowsMapper,
    renderUserModals,
    selectUserRequest
}