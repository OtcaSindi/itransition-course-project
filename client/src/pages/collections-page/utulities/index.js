import map from "lodash/fp/map"
import {createCollectionByUserId, editCollectionById, deleteCollectionById} from "../../../services"
import CreateEditActionCollectionModal from "../../../components/modals/create-edit-action-collection-modal"

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
        header: 'Default title for items',
        key: 'itemTitleDefault'
    },
    {
        header: 'Default tags for items',
        key: 'itemTagsDefault'
    },
    {
        header: 'Theme',
        key: 'theme'
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

const initialRowsMapper = map(({id, title, description, theme, image, itemTitleDefault, itemTagsDefault}) => {
    return {
        id,
        title,
        description,
        theme,
        image,
        itemTitleDefault,
        itemTagsDefault
    }
})

const renderCollectionModal = {
    delete: '',
    edit: CreateEditActionCollectionModal,
    create: CreateEditActionCollectionModal
}

const selectCollectionRequest = (action) => {
    switch (action) {
        case 'edit':
            return editCollectionById
        case 'create':
            return createCollectionByUserId
        case 'delete':
            return deleteCollectionById
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
    renderCollectionModal,
    selectCollectionRequest
}