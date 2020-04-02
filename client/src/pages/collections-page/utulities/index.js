import map from "lodash/fp/map"
import {createCollectionById, editCollectionById, deleteCollectionById} from "../../../services"

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

const renderItemModals = {
    Delete: '',
    Edit: '',
    Create: ''
}

const selectItemRequest = (action) => {
    switch (action) {
        case 'Edit':
            return editCollectionById
        case 'Create':
            return createCollectionById
        case 'Delete':
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
    renderItemModals,
    selectItemRequest
}