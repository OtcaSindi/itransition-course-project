import {create} from "../services"

const collectionsRequested = () => {
    return {
        type: 'FETCH_COLLECTIONS_REQUEST'
    }
}

const collectionsLoaded = (newCollections) => {
    return {
        type: 'FETCH_COLLECTIONS_SUCCESS',
        payload: newCollections
    }
}

const collectionsError = (error) => {
    return {
        type: 'FETCH_COLLECTIONS_FAILURE',
        payload: error
    }
}

const fetchCollections = (token, userId) => (dispatch) => {
    dispatch(collectionsRequested())
    create().getCollectionsById(token, userId || '')
        .then(({data}) => {
            dispatch(collectionsLoaded(data))
        })
        .catch((err) => {
                dispatch(collectionsError(err))
            }
        )
}

const createCollectionRequest = (token, form, userId) => (dispatch) => {
    dispatch(collectionsRequested())
    create().createCollectionById(token, form, userId || '')
        .then(({data}) => {
            dispatch(collectionsLoaded(data))
        })
        .catch((err) => {
                dispatch(collectionsError(err))
            }
        )
}

const editCollectionRequest = (token, form, collectionId, userId) => (dispatch) => {
    dispatch(collectionsRequested())
    create().editCollectionById(token, form, collectionId)
        .then(() => {
            dispatch(fetchCollections(token, userId))
        })
        .catch((err) => {
                dispatch(collectionsError(err))
            }
        )
}

const deleteCollectionRequest = (token, id, userId) => (dispatch) => {
    dispatch(collectionsRequested())
    create().deleteCollectionById(token, id)
        .then(() => {
            dispatch(fetchCollections(token, userId))
        })
        .catch((err) => {
                dispatch(collectionsError(err))
            }
        )
}

export {
    collectionsRequested,
    collectionsLoaded,
    collectionsError,
    fetchCollections,
    createCollectionRequest,
    editCollectionRequest,
    deleteCollectionRequest
}
