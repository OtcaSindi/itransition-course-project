import {combineReducers} from "redux"

import usersReducer from './usersReducer'
import collectionsReducer from "./collectionsReducer"
import itemsReducer from "./itemsReducer"

export default combineReducers({usersReducer, collectionsReducer, itemsReducer})
