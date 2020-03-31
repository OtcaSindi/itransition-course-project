const initialState = {
    data: [],
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

            const data = action.payload

            return {
                ...state,
                loading: false,
                data
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
