import MainTableExpandedRowItem from "./main-table-expanded-row-item"
import MainTableExpandedRowUser from "./main-table-expanded-row-user"
import React from "react"

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

export default DynamicExpandedComponent