import React from "react"
import map from "lodash/map"
import isEmpty from "lodash/isEmpty"
import {
    OverflowMenu,
    OverflowMenuItem,
    TableCell,
    TableExpandRow, TableRow,
    TableSelectRow
} from "carbon-components-react"

import styles from './main-table-row.module.css'
import MainTableExpandedRowItem from "./main-table-expanded-row-item"
import MainTableExpandedRowUser from "./main-table-expanded-row-user"

const selectedRowsIds = (arr) => map(arr, ({id}) => id)

const DynamicExpandComponent = ({expandRows, children, ...props}) => {
    return (
        (
            expandRows ?
                <TableExpandRow {...props}>
                    {children}
                </TableExpandRow> :
                <TableRow>
                    {children}
                </TableRow>
        )
    )
}

const DynamicExpandedComponent = ({expandRows, isExpanded, initialRow, colSpan}) => {
    if (!expandRows) {
        return null
    }
    if (isExpanded) {
        if (expandRows === 'items') {
            return (
                <MainTableExpandedRowItem
                    initialRow={initialRow}
                    colSpan={colSpan}
                />
            )
        } else if (expandRows === 'users') {
            return (
                <MainTableExpandedRowUser
                    initialRow={initialRow}
                    colSpan={colSpan}
                />
            )
        }
    }
    return null
}

const MainTableRow = (
    {
        row,
        initialRow,
        onExpand,
        rest,
        getSelectionProps,
        OverflowActionInfoComponent,
        overflowActions,
        selectedRows,
        headers,
        expandRows,
    }) => {

    return (
        <>
            <DynamicExpandComponent {...rest} onExpand={onExpand} expandRows={expandRows}>
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
                            {OverflowActionInfoComponent &&
                            <OverflowActionInfoComponent id={row.id}/>}
                            {map(overflowActions, ({name, key, onClick}) => (
                                <OverflowMenuItem key={key}
                                                  itemText={name}
                                                  onClick={() => onClick(key, [row])}
                                />
                            ))}
                        </OverflowMenu>
                    }
                </TableCell>}
            </DynamicExpandComponent>

            <DynamicExpandedComponent
                initialRow={initialRow}
                expandRows={expandRows}
                isExpanded={row.isExpanded}
                colSpan={!isEmpty(overflowActions) ? headers.length + 3 : headers.length + 2}
            />
        </>
    )
}

export default MainTableRow