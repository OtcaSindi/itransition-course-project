import map from "lodash/fp/map"

import {dateFormat} from "../../../commonFunctions"
import DeleteItemModal from "../../../components/modals/delete-items-modal"
import ModalOnBatchToolbarActionsItem from "../../../components/modals/modal-on-batch-toolbar-action-item"
import axiosRequest from "../../../services"

const headersItems = [
    {
        header: 'Title',
        key: 'title'
    },
    {
        header: 'Description',
        key: 'description'
    },
    {
        header: 'Date creation',
        key: 'dateCreation'
    },
    {
        header: 'Likes',
        key: 'likes'
    },
]

const batchActions = [
    {
        name: 'Delete'
    },
]

const overflowActions = [
    {
        name: 'Edit'
    },
    {
        name: 'Delete'
    },
]

const toolbarActions = [
    {
        name: 'Create'
    }
]

const initialRowsMapper = map(({id, title, description, dateCreation, likes}) => {
    return {
        id,
        title,
        description,
        dateCreation: dateFormat(dateCreation),
        likes
    }
})

const renderItemModals = {
    Delete: DeleteItemModal,
    Edit: ModalOnBatchToolbarActionsItem,
    Create: ModalOnBatchToolbarActionsItem
}

const selectItemRequest = (action) => {
    switch (action) {
        case 'Edit':
            return axiosRequest.editItemById
        case 'Create':
            return axiosRequest.createItemByCollectionId
        default:
            return null
    }
}

export {
    headersItems,
    batchActions,
    overflowActions,
    toolbarActions,
    initialRowsMapper,
    renderItemModals,
    selectItemRequest
}