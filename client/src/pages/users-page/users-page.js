import React, {useCallback, useContext, useMemo} from "react"

import {AuthContext} from "../../context/AuthContext"
import {fetchUsers} from "../../actionsCreator"
import {usersReducerSelector as selector} from "../../selectors"

import {
    headersItems,
    batchActions,
    overflowActions,
    initialRowsMapper,
    renderUserModals,
    selectUserRequest
} from "./utilities"
import {useTableData} from "../../hooks/use-table-data"
import MainTable from "../../components/main-table"
import DynamicComponent from "../../components/dynamic-component"

const UsersPage = () => {

    const {token} = useContext(AuthContext)

    const memoizedAction = useMemo(() => {
        return fetchUsers(token)
    }, [token])

    const {
        tableProps,
        menuAction,
        setReFetch,
        onClose
    } = useTableData({
        action: memoizedAction,
        headersItems,
        selector,
        initialRowsMapper,
        batchActions,
        overflowActions
    })

    const onModalClose = useCallback(() => {
        setReFetch(i => !i)
        onClose()
    }, [setReFetch, onClose])

    return (
        <>
            <DynamicComponent
                component={renderUserModals[menuAction.action]}
                primaryRequest={selectUserRequest(menuAction.action)}
                operation={menuAction.action}
                {...menuAction}
                onClose={onModalClose}
            />

            <MainTable
                tableTitle="Users"
                {...tableProps}
            />
        </>
    )
}

export default UsersPage

