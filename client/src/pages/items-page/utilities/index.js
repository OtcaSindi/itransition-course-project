import map from "lodash/fp/map"

import {dateFormat} from "../../../utilities-functions"
import DeleteItemModal from "../../../components/modals/delete-items-modal"
import ModalOnBatchToolbarActionsItem from "../../../components/modals/create-edit-action-item-modal"
import {createItemByCollectionId, deleteItemById, editItemById} from "../../../services"

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
        name: 'Delete',
        key: 'delete'
    },
]

const overflowActions = [
    {
        name: 'Edit',
        key: 'edit'
    },
    {
        name: 'Delete',
        key: 'delete'
    },
]

const toolbarActions = [
    {
        name: 'Create',
        key: 'create'
    }
]

const initialRowsMapper = map(({id, title, description, dateCreation, likes, image, tags, comments}) => {
    return {
        id,
        title,
        description,
        image,
        tags,
        likes,
        dateCreation: dateFormat(dateCreation),
        comments
    }
})

const renderItemModals = {
    delete: DeleteItemModal,
    edit: ModalOnBatchToolbarActionsItem,
    create: ModalOnBatchToolbarActionsItem
}

const selectItemRequest = (action) => {
    switch (action) {
        case 'edit':
            return editItemById
        case 'create':
            return createItemByCollectionId
        case 'delete':
            return deleteItemById
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