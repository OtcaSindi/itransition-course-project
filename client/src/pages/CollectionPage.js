import React, {useCallback, useContext, useMemo, useState} from 'react'

import map from 'lodash/fp/map'
import {fetchItems} from "../actionsCreator"
import ItemsTable from "../components/items-table"
import {AuthContext} from "../context/AuthContext"
import {dateFormat} from "../commonFunctions"
import {useTableData} from "../hooks/use-table-data"

const selector = state => state.itemsReducer

const headersItems = [
    {
        header: 'Title',
        key: 'title'
    },
    {
        header: 'Date creation',
        key: 'dateCreation'
    },
    {
        header: 'Description',
        key: 'description'
    },
    {
        header: 'Likes',
        key: 'likes'
    }]

const tableActions = [
    {
        name: 'Edit',
    },
    {
        name: 'Delete'
    },
]

const initialRowsMapper = map(({id, title, description, dateCreation}) => {
    return {
        id,
        title,
        description,
        dateCreation: dateFormat(dateCreation),
        likes: 100
    }
})

const CollectionPage = ({collectionId}) => {

    const {token} = useContext(AuthContext)

    const [action, setAction] = useState({})

    const handleClick = useCallback((selectedRows, e) => {
        setAction({action: e.nativeEvent.target.textContent, items: selectedRows})
    }, [])

    const memoizedAction = useMemo(() => {
        return fetchItems(token, collectionId)
    }, [token, collectionId])

    const {tableProps, batchAction} = useTableData({
        action: memoizedAction,
        headersItems,
        selector,
        initialRowsMapper,
        tableActions,
    })

    return (
        <div style={{display: 'flex', alignItems: 'center', margin: '0 2%'}}>
            <ItemsTable {...tableProps} />
        </div>
    )
}

export default CollectionPage
