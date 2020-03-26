import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

const ItemsTable = () => {

    const {items} = useSelector(state => state.itemsReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        //fetchItems
    }, [])

    return (
        <div>

        </div>
    )
}

export default ItemsTable
