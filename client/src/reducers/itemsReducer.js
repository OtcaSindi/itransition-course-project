const initialState = {
    items: [],
    loading: false,
    error: false
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

            const items = action.payload

            return {
                ...state,
                loading: false,
                items
            }
        }

        case 'FETCH_ITEMS_FAILURE': {

            return {
                ...state,
                error: action.payload
            }
        }

        default:
            return state
    }
}

export default itemsReducer
