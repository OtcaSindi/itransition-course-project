import React, {useCallback, useContext, useMemo} from 'react'

import map from 'lodash/fp/map'
import isUndefined from 'lodash/isUndefined'
import over from 'lodash/over'
import {fetchItems} from "../actionsCreator"
import ItemsTable from "../components/items-table"
import {AuthContext} from "../context/AuthContext"
import {dateFormat} from "../commonFunctions"
import {useTableData} from "../hooks/use-table-data"
import LaunchModal from "../components/launch-modal"

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
    Delete: LaunchModal
}

const DynamicComponent = ({component: Component, ...rest}) => {
    return !isUndefined(Component) && <Component {...rest} />
}

const initialRowsMapper = map(({_id: id, title, description, dateCreation}) => {
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
        setRefetch,
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
        setRefetch(i => !i)
        onClose()
    }, [setRefetch, onClose])

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
