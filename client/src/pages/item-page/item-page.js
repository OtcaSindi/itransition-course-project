import React, {useContext, useEffect} from 'react'

import Comments from "../../components/comments"
import {AuthContext} from "../../context/AuthContext"

const ItemPage = ({itemId}) => {

    const token = useContext(AuthContext)

    useEffect(() => {

    }, [token])

    return (
        <Comments comments={[]}/>
    )
}

export default ItemPage