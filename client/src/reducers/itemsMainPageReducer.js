const initialState = {
    data: [],
    loading: false,
    errorStatus: null
}

const itemsMainPageReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'FETCH_ITEMS_MAIN_PAGE_REQUEST': {

            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_ITEMS_MAIN_PAGE_SUCCESS': {

            const data = action.payload

            return {
                ...state,
                loading: false,
                data
            }
        }

        case 'FETCH_ITEMS_MAIN_PAGE_FAILURE': {

            const {response: {status}} = action.payload

            return {
                ...state,
                errorStatus: status
            }
        }

        default:
            return state
    }
}

export default itemsMainPageReducer
