import React, {useCallback, useContext, useMemo, useState} from 'react'

import map from 'lodash/fp/map'
import isUndefined from 'lodash/isUndefined'
import {fetchItems} from "../actionsCreator"
import ItemsTable from "../components/items-table"
import {AuthContext} from "../context/AuthContext"
import {dateFormat} from "../commonFunctions"
import {useTableData} from "../hooks/use-table-data"
import LaunchModal from "../components/modals/launch-modal"
import EditModal from "../components/modals/edit-modal"

const selector = state => state.itemsReducer

const headersItems = [
    {
        header: 'Title',
        key: 'title'
    },
    {
        header: 'Description',
        key: 'description'
    },
    {
        header: 'Date creation',
        key: 'dateCreation'
    },
    {
        header: 'Likes',
        key: 'likes'
    },
]

const batchActions = [
    {
        name: 'Delete'
    },
]

const overflowActions = [
    {
        name: 'Edit'
    },
    {
        name: 'Delete'
    },
]

const renderModals = {
    Delete: LaunchModal,
    Edit: EditModal
}

const DynamicComponent = ({component: Component, ...rest}) => {
    return !isUndefined(Component) && <Component {...rest} />
}

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

    const memoizedAction = useMemo(() => {
        return fetchItems(token, collectionId)
    }, [token, collectionId])

    const {
        tableProps,
        menuAction,
        setReFetch,
        onClose,
    } = useTableData({
        action: memoizedAction,
        headersItems,
        selector,
        initialRowsMapper,
        batchActions,
        overflowActions,
    })

    const onModalClose = useCallback(() => {
        setReFetch(i => !i)
        onClose()
    }, [setReFetch, onClose])

    console.log(menuAction)

    return (
        <>
            <DynamicComponent
                component={renderModals[menuAction.action]}
                {...menuAction}
                onClose={onModalClose}
            />
            <div style={{display: 'flex', alignItems: 'center', margin: '0 2%'}}>
                <ItemsTable {...tableProps} />
            </div>
        </>
    )
}

export default CollectionPage
