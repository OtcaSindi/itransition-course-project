import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"

export const useData = ({action, selector, refetch}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(action)
    }, [action, dispatch, refetch])

    const {loading, data, error} = useSelector(selector)

    return {
        loading,
        data,
        error,
    }
}