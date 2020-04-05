import {
    getSearchedItems,
    getItemById
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

const fetchSearchedItemsMainPage = (options) => (dispatch) => {
    dispatch(itemsMainPageRequested())
    getSearchedItems(options)
        .then(({data}) => {
            dispatch(itemsMainPageLoaded(data))
        })
        .catch((err) => {
                dispatch(itemsMainPageError(err))
            }
        )
}

const fetchSearchedItemById = (itemId) => (dispatch) => {
    dispatch(itemsMainPageRequested())
    getItemById(itemId)
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
    fetchSearchedItemsMainPage,
    fetchSearchedItemById
}
