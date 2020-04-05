import React, {useContext, useEffect} from 'react'

import Comments from "../../components/comments"
import {useDispatch} from "react-redux"
import {AuthContext} from "../../context/AuthContext"

const ItemPage = ({itemId}) => {

    const dispatch = useDispatch()
    const {idLikedItems} = useContext(AuthContext)

    useEffect(() => {

    }, [])

    return (
        <div>
            <Comments comments={[]}/>
        </div>
    )
}

export default ItemPage