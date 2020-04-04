const initialState = {
    data: [],
    collection: {},
    loading: false,
    errorStatus: null
}

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'FETCH_ITEMS_REQUEST': {

            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_ITEMS_SUCCESS': {

            const {items: data, collection = {}} = action.payload

            return {
                ...state,
                loading: false,
                data,
                collection
            }
        }

        case 'FETCH_ITEMS_FAILURE': {

            const {response: {status}} = action.payload

            return {
                ...state,
                errorStatus: status,
                loading: false
            }
        }

        default:
            return state
    }
}

export default itemsReducer
