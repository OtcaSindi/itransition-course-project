import {useData} from "../use-data"
import {useAction} from "../use-action"
import map from 'lodash/map'
import {useState} from "react"

const useActionMapper = ({handleClick, menuActions}) => {
    return map(menuActions, (i) => map(i, (item) => ({...item, onClick: handleClick})))
}

export const useTableData = (
    {
        headersItems,
        action,
        selector,
        initialRowsMapper,
        batchActions,
        overflowActions,
    }) => {

    const [refetch, setRefetch] = useState(false)

    const {loading, data} = useData({action, selector, refetch})

    const {action: menuAction, handleClick, onClose} = useAction()

    const [batchActionsMapped, overflowActionsMapped] = useActionMapper({handleClick, menuActions: [batchActions, overflowActions]})

    return {
        tableProps: {
            headersItems,
            initialRows: initialRowsMapper(data),
            loading,
            batchActions: batchActionsMapped,
            overflowActions: overflowActionsMapped,
        },
        menuAction,
        setRefetch,
        onClose,
    }
}