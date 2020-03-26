import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"

import {fetchItems} from "../actionsCreator"
import {useAuth} from "../hooks/auth.hook"
import {create} from "../services"

const CollectionPage = ({collectionId}) => {

    const dispatch = useDispatch()
    const {items} = useSelector(state => state.itemsReducer)
    const {token} = useAuth()

    const createItem = () => {
        create().createItem(token, {
            title: 'title',
            description: 'description',
            tags: ['tag1', 'tag2']
        }, collectionId)
    }

    const addComment = () => {
        create().addCommentByItemId(token, {
            comment: 'fuck you boy'
        }, items[0]._id)
    }

    useEffect(() => {
        dispatch(fetchItems(token, collectionId))
    }, [dispatch, token, collectionId])

    return (
        <>
            <div>
                <button onClick={createItem} className="btn">Create item</button>
            </div>
            <div>
                <button onClick={addComment} className="btn">Add comment</button>
            </div>
        </>
    )
}

export default CollectionPage
