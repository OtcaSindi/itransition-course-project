import {useData} from "../use-data"
import {useBatchAction} from "../use-batch-action"
import map from 'lodash/map'

export const useTableData = (
    {
        headersItems,
        action,
        selector,
        initialRowsMapper,
        tableActions
    }) => {

    const {loading, data} = useData({action, selector})

    const {batchAction, handleClickBatch} = useBatchAction()



    return {
        tableProps: {
            headersItems,
            initialRows: initialRowsMapper(data),
            loading,
            tableActions: map(tableActions, i => ({...i, handleClickBatch})),
        },
        batchAction,
    }
}