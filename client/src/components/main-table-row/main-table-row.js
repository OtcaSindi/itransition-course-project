import isEmpty from "lodash/isEmpty"
import {
    OverflowMenu,
    OverflowMenuItem,
    TableCell,
    TableExpandedRow,
    TableExpandRow, TableRow,
    TableSelectRow
} from "carbon-components-react"
import map from "lodash/map"
import React from "react"

const selectedRowsIds = (arr) => map(arr, ({id}) => id)

const DynamicExpandComponent = ({expandRow, children, ...props}) => {
    return (
        (
            expandRow ?
                <TableExpandRow {...props}>
                    {children}
                </TableExpandRow> :
                <TableRow>
                    {children}
                </TableRow>
        )
    )
}

const MainTableRow = (
    {
        row,
        onExpand,
        rest,
        getSelectionProps,
        overflowActions,
        selectedRows,
        headers,
        expandRow
    }) => {

    return (
        <>
            <DynamicExpandComponent {...rest} onExpand={onExpand} expandRow={expandRow}>
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
                                <OverflowMenuItem key={name}
                                                  itemText={name}
                                                  onClick={e => onClick(e, [row])}
                                                  primaryFocus={idx === 0}/>
                            ))}
                        </OverflowMenu>
                    }
                </TableCell>}

            </DynamicExpandComponent>
            {
                expandRow &&
                row.isExpanded &&
                <TableExpandedRow
                    colSpan={!isEmpty(overflowActions) ? headers.length + 3 : headers.length + 2}>
                    expandRow
                </TableExpandedRow>
            }
        </>
    )
}

export default MainTableRow