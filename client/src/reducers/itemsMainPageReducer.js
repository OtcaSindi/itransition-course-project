const initialState = {
    data: [],
    user: {},
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

            const {items: data, user} = action.payload

            return {
                ...state,
                loading: false,
                data,
                user
            }
        }

        case 'FETCH_ITEMS_MAIN_PAGE_FAILURE': {

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

export default itemsMainPageReducer
