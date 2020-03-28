import {useCallback, useState} from "react"

export const useBatchAction = () => {
    const [batchAction, setBatchAction] = useState({})

    const handleClickBatch = useCallback((selectedRows, e) => {
        console.log(e.nativeEvent.target.textContent, e.target.name, 1)
        setBatchAction({action: e.nativeEvent.target.textContent, items: selectedRows})
    }, [])

    return {
        batchAction,
        handleClickBatch,
    }
}