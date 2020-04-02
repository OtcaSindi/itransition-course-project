import React from "react"

import {
    DataTable,
    Button,
    SearchSkeleton,
} from 'carbon-components-react'

import {Add16, Delete16} from "@carbon/icons-react"

import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import styles from './main-table.module.css'
import './main-table.css'
import MainTableRow from "../main-table-row"

const {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableHeader,
    TableToolbar,
    TableToolbarSearch,
    TableToolbarContent,
    TableBatchActions,
    TableBatchAction,
    TableSelectAll,
} = DataTable

const MainTable = (
    {
        headersItems,
        initialRows,
        loading,
        batchActions,
        overflowActions,
        toolbarActions,
        tableTitle,
        isExpandRows
    }) => {

    return (
        <DataTable
            rows={[...initialRows, ]}
            headers={headersItems}
            render={({
                         rows,
                         headers,
                         getHeaderProps,
                         getSelectionProps,
                         getBatchActionProps,
                         onInputChange,
                         selectedRows,
                         getRowProps,
                         expandAll,
                     }) => (
                <TableContainer
                    title={<div className={styles.titleHeader}><span className={styles.textHeader}>{tableTitle}</span>
                    </div>}>
                    <TableToolbar>
                        {selectedRows.length !== 0 && <TableBatchActions {...getBatchActionProps()} >
                            {console.log(selectedRows)}
                            {map(batchActions, ({name, onClick}) => (
                                <TableBatchAction
                                    renderIcon={null}
                                    key={name}
                                    onClick={e => onClick(e, selectedRows)}
                                >
                                    {name}
                                </TableBatchAction>
                            ))}
                        </TableBatchActions>}
                        <TableToolbarContent>
                            {loading ? <SearchSkeleton className={styles.searchSkeletonToolbar}/> :
                                <>
                                    <TableToolbarSearch
                                        persistent
                                        onChange={onInputChange}/>
                                    {map(toolbarActions, ({name, onClick}) => {
                                        return (
                                            <Button
                                                key={name}
                                                onClick={onClick}
                                                size='default'
                                                kind="primary"
                                                renderIcon={Add16}
                                            >
                                                {name}
                                            </Button>
                                        )
                                    })}
                                </>
                            }
                        </TableToolbarContent>
                    </TableToolbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {isExpandRows && <TableHeader onClick={expandAll}>Expand</TableHeader>}
                                <TableSelectAll {...getSelectionProps()} />
                                {headers.map(({header}) => (
                                    <TableHeader key={header} {...getHeaderProps({header})}>
                                        {header}
                                    </TableHeader>
                                ))}
                                {!isEmpty(overflowActions) && <TableHeader/>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => {
                                const {onExpand, ...rest} = getRowProps({row})
                                return (
                                    <MainTableRow
                                        expandRow={isExpandRows}
                                        key={row.id}
                                        row={row}
                                        onExpand={onExpand}
                                        rest={rest}
                                        selectedRows={selectedRows}
                                        getSelectionProps={getSelectionProps}
                                        overflowActions={overflowActions}
                                        headers={headers}
                                    />
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        />
    )
}

MainTable.defaultProps = {
    batchActions: []
}

export default MainTable