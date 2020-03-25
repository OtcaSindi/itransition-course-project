const initialState = {
    collections: [],
    loading: false,
    error: null
}

const collectionsReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'FETCH_COLLECTIONS_REQUEST': {

            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_COLLECTIONS_SUCCESS': {

            const collections = action.payload

            return {
                ...state,
                loading: false,
                collections
            }
        }

        case 'FETCH_COLLECTIONS_FAILURE': {

            return {
                ...state,
                error: action.payload
            }
        }

        default:
            return state
    }
}

export default collectionsReducer
