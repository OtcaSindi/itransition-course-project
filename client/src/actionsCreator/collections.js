import axiosRequest from "../services"

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

const collectionsError = (errorStatus) => {
    return {
        type: 'FETCH_COLLECTIONS_FAILURE',
        payload: errorStatus
    }
}

const fetchCollections = (token, userId) => (dispatch) => {
    dispatch(collectionsRequested())
    axiosRequest.getCollectionsById(token, userId || '')
        .then(({data}) => {
            dispatch(collectionsLoaded(data))
        })
        .catch((err) => {
                dispatch(collectionsError(err.response.status))
            }
        )
}

const createCollectionRequest = (token, form, userId) => (dispatch) => {
    dispatch(collectionsRequested())
    axiosRequest.createCollectionById(token, form, userId || '')
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
    axiosRequest.editCollectionById(token, form, collectionId)
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
    axiosRequest.deleteCollectionById(token, id)
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
