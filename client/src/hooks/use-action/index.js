import {useCallback, useState} from "react"

export const useAction = () => {
    const [action, setAction] = useState({})

    const handleClick = useCallback((e, selectedRows) => {
        setAction({action: e.nativeEvent.target.textContent, items: selectedRows, open: true})
    }, [setAction])

    const onClose = useCallback(() => {
        setAction({})
    }, [setAction])

    return {
        action,
        handleClick,
        onClose,
    }
}