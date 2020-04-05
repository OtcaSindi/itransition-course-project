import {
    getSearchedItemsAuth, getSearchedItemsNoAuth,
} from "../services"

const itemsMainPageRequested = () => {
    return {
        type: 'FETCH_ITEMS_MAIN_PAGE_REQUEST'
    }
}

const itemsMainPageLoaded = (newItems) => {
    return {
        type: 'FETCH_ITEMS_MAIN_PAGE_SUCCESS',
        payload: newItems
    }
}

const itemsMainPageError = (error) => {
    return {
        type: 'FETCH_ITEMS_MAIN_PAGE_FAILURE',
        payload: error
    }
}

const fetchAllItemsMainPage = (token, options) => (dispatch) => {
    dispatch(itemsMainPageRequested())
    const request = token ? getSearchedItemsAuth : getSearchedItemsNoAuth
    request(token, options)
        .then(({data}) => {
            dispatch(itemsMainPageLoaded(data))
        })
        .catch((err) => {
                dispatch(itemsMainPageError(err))
            }
        )
}

export {
    itemsMainPageRequested,
    itemsMainPageLoaded,
    itemsMainPageError,
    fetchAllItemsMainPage
}
