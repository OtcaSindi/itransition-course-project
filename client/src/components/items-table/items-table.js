import React, {Fragment} from "react"

import {
    DataTable,
    Button,
    ButtonSkeleton,
    OverflowMenu,
    OverflowMenuItem,
} from 'carbon-components-react'

import {Add16, Delete16} from "@carbon/icons-react"

import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

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


const selectedRowsIds = (arr) => map(arr, ({id}) => id)

const ItemsTable = ({headersItems, initialRows, loading, batchActions, overflowActions, toolbarActions, tableTitle}) => {
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
                    title={<div className={styles.titleHeader}><span className={styles.textHeader}>{tableTitle}</span>
                    </div>}>
                    <TableToolbar>
                        <TableBatchActions {...getBatchActionProps()} >
                            {map(batchActions, ({name, onClick}) => (
                                <TableBatchAction renderIcon={Delete16} key={name} onClick={e => onClick(e, selectedRows)}>
                                    {name}
                                </TableBatchAction>
                            ))}
                        </TableBatchActions>
                        <TableToolbarContent>
                            <TableToolbarSearch
                                persistent
                                onChange={onInputChange}/>
                            {loading ? (
                                <ButtonSkeleton className={styles.buttonSkeletonToolbar}/>
                            ) : (map(toolbarActions, ({name, onClick}) => {
                                    return (
                                        <Button
                                            onClick={onClick}
                                            size='default'
                                            kind="primary"
                                            renderIcon={Add16}
                                        >
                                            {name}
                                        </Button>
                                    )
                                })
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
                                {!isEmpty(overflowActions) && <TableHeader/>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => {
                                const {onExpand, ...rest} = getRowProps({row})
                                return (
                                    <Fragment key={row.id}>
                                        <TableExpandRow {...rest} onExpand={onExpand}>
                                            <TableSelectRow {...getSelectionProps({row})}/>
                                            {row.cells.map(cell => (
                                                <TableCell key={cell.id}>
                                                    {cell.value}
                                                </TableCell>
                                            ))}
                                            {!isEmpty(overflowActions) &&
                                            <TableCell className='overflowActionsContainer'>
                                                {
                                                    !selectedRowsIds(selectedRows).find(id => id === row.id) &&
                                                    <OverflowMenu flipped>
                                                        {map(overflowActions, ({name, onClick}, idx) => (
                                                            <OverflowMenuItem itemText={name}
                                                                              onClick={e => onClick(e, [row])}
                                                                              primaryFocus={idx === 0}/>
                                                        ))}
                                                    </OverflowMenu>
                                                }
                                            </TableCell>}

                                        </TableExpandRow>
                                        {row.isExpanded &&
                                        <TableExpandedRow
                                            colSpan={!isEmpty(overflowActions) ? headers.length + 3 : headers.length + 2}>
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
    batchActions: []
}

export default ItemsTable