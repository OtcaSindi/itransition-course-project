import React, {useCallback, useContext, useMemo} from 'react'
import {useSelector} from "react-redux"

import DynamicComponent from "../../components/dynamic-component"
import {itemsReducerSelector} from '../../selectors'
import {fetchItems} from "../../actionsCreator"
import MainTable from "../../components/main-table"
import {AuthContext} from "../../context/AuthContext"
import {useTableData} from "../../hooks/use-table-data"
import {itemsReducerSelector as selector} from "../../selectors"
import {useNotification} from "../../portals/notification-portal"
import {
    headersItems,
    batchActions,
    overflowActions,
    toolbarActions,
    initialRowsMapper,
    renderItemModals,
    selectItemRequest
} from "./utilities"

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
        toolbarActions,
    })

    // const fireNotification = useNotification()
    //
    // const fireN = () => {
    //     fireNotification({
    //         kind: 'primary',
    //         notificationType: 'inline',
    //         caption: null,
    //         delay: 3000,
    //     })
    // }

    const onModalClose = useCallback(() => {
        setReFetch(i => !i)
        onClose()
    }, [setReFetch, onClose])

    const {collection} = useSelector(itemsReducerSelector)

    return (
        <>
            {/*<button onClick={fireN}> Hello</button>*/}
            <DynamicComponent
                component={renderItemModals[menuAction.action]}
                primaryRequest={selectItemRequest(menuAction.action)}
                operation={menuAction.action}
                collection={collection}
                {...menuAction}
                onClose={onModalClose}
            />

            <MainTable
                tableTitle={collection.title ? `Items "${collection.title}"` : 'Items'}
                {...tableProps}
                expandRows="items"
            />
        </>
    )
}

export default CollectionPage
