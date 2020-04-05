import React, {useContext, useEffect} from 'react'

import Comments from "../../components/comments"
import {useDispatch} from "react-redux"
import {AuthContext} from "../../context/AuthContext"
import {fetchSearchedItemById} from "../../actionsCreator"

const ItemPage = ({itemId}) => {

    const dispatch = useDispatch()
    const {idLikedItems} = useContext(AuthContext)

    useEffect(() => {
        dispatch(fetchSearchedItemById(itemId))
    }, [itemId])

    const checkItemLikes = idLikedItems && idLikedItems.includes()

    return (
        <div>
            <Comments comments={[]}/>
        </div>
    )
}

export default ItemPage