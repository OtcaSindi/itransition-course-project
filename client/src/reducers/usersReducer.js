const initialState = {
    loading: false,
    error: null,
    data: []
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'FETCH_USERS_REQUEST': {

            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_USERS_SUCCESS': {

            const data = action.payload

            return {
                ...state,
                loading: false,
                data
            }
        }

        case 'FETCH_USERS_FAILURE': {

            return {
                ...state,
                error: action.payload
            }
        }

        default:
            return state
    }
}

export default usersReducer
