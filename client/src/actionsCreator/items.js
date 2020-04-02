import axiosRequest from "../services"

const itemsRequested = () => {
    return {
        type: 'FETCH_ITEMS_REQUEST'
    }
}

const itemsLoaded = (newItems) => {
    return {
        type: 'FETCH_ITEMS_SUCCESS',
        payload: newItems
    }
}

const itemsError = (error) => {
    return {
        type: 'FETCH_ITEMS_FAILURE',
        payload: error
    }
}

const fetchItems = (token, collectionId) => (dispatch) => {
    dispatch(itemsRequested())
    axiosRequest.getItemsByCollectionId(token, collectionId || '')
        .then(({data}) => {
            dispatch(itemsLoaded(data))
        })
        .catch((err) => {
                dispatch(itemsError(err))
            }
        )
}

const fetchAllItems = (token) => (dispatch) => {
    dispatch(itemsRequested())
    axiosRequest.getAllItems(token)
        .then(({data}) => {
            dispatch(itemsLoaded(data))
        })
        .catch((err) => {
                dispatch(itemsError(err))
            }
        )
}

const createItemRequest = (token, form, userId) => (dispatch) => {
    dispatch(itemsRequested())
    axiosRequest.createCollectionById(token, form, userId || '')
        .then(({data}) => {
            dispatch(itemsLoaded(data))
        })
        .catch((err) => {
                dispatch(itemsError(err))
            }
        )
}

const deleteItemRequest = (token, id, userId) => (dispatch) => {
    dispatch(itemsRequested())
    axiosRequest.deleteCollectionById(token, id)
        .then(() => {
            dispatch(itemsLoaded(token, userId))
        })
        .catch((err) => {
                dispatch(itemsError(err))
            }
        )
}

export {
    itemsRequested,
    itemsLoaded,
    itemsError,
    fetchItems,
    createItemRequest,
    deleteItemRequest,
    fetchAllItems
}
