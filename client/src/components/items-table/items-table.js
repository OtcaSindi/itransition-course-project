import React, {Fragment} from "react"

import {DataTable, Button, SkeletonText, ButtonSkeleton} from 'carbon-components-react'

import {Add16} from "@carbon/icons-react"

import noop from 'lodash/noop'
import over from 'lodash/over'
import map from 'lodash/map'

import styles from './table.module.css'
import './styles.css'

const {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableExpandRow,
    TableHeader,
    TableCell,
    TableToolbar,
    TableToolbarSearch,
    TableToolbarContent,
    TableExpandedRow,
    TableBatchActions,
    TableBatchAction,
    TableSelectAll,
    TableSelectRow,
} = DataTable

const ItemsTable = ({headersItems, initialRows, loading, tableActions}) => {

    const exp = (f) => over([f, noop])

    return (
        <DataTable
            rows={initialRows}
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
                    title={<div className={styles.titleHeader}><span className={styles.textHeader}>Items</span></div>}>
                    <TableToolbar>
                        <TableBatchActions {...getBatchActionProps()}>
                            {map(tableActions, ({name, handleClickBatch}) => (
                                <TableBatchAction key={name} onClick={e => handleClickBatch(selectedRows, e)}>
                                    {name}
                                </TableBatchAction>
                            ))}
                        </TableBatchActions>
                        <TableToolbarContent>
                            <TableToolbarSearch
                                persistent
                                onChange={onInputChange}/>
                            {loading ? (
                                <ButtonSkeleton/>
                            ) : (
                                <Button
                                    onClick={noop} size='default'
                                    kind="primary"
                                    renderIcon={Add16}
                                >
                                    Create item
                                </Button>
                            )}
                        </TableToolbarContent>
                    </TableToolbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader onClick={expandAll}>Expand</TableHeader>
                                <TableSelectAll {...getSelectionProps()} />
                                {headers.map(header => (
                                    <TableHeader {...getHeaderProps({header})}>
                                        {header.header}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => {
                                const {onExpand, ...rest} = getRowProps({row})
                                return (
                                    <Fragment key={row.id}>
                                        <TableExpandRow {...rest} onExpand={exp(onExpand)}>
                                            <TableSelectRow {...getSelectionProps({row})} />
                                            {row.cells.map(cell => (
                                                <TableCell key={cell.id}>
                                                    {loading ? <SkeletonText/> : cell.value}
                                                </TableCell>
                                            ))}
                                        </TableExpandRow>
                                        {row.isExpanded &&
                                        <TableExpandedRow colSpan={headers.length + 2}>
                                            Hello
                                        </TableExpandedRow>
                                        }
                                    </Fragment>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        />
    )
}

ItemsTable.defaultProps = {
    tableActions: []
}

export default ItemsTable