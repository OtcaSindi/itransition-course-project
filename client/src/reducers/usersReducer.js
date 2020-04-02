const initialState = {
    loading: false,
    errorStatus: null,
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

export default usersReducer
