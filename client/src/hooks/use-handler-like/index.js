import {useCallback, useContext, useState} from "react"
import {useDispatch} from "react-redux"
import {AuthContext} from "../../context/AuthContext"

export const useHandlerLike = (
    {
        likedItem,
        countLikes: defaultCountLikes,
        itemLikes: defaultItemLikes,
        styleLikeOn,
        styleLikeOff,
        actionForError
    }) => {

    const dispatch = useDispatch()
    const {setOpenModal} = useContext(AuthContext)

    const [isNowRequest, setIsNowRequest] = useState(false)
    const [resCountLikes, setResCountLikes] = useState(defaultCountLikes)
    const [classLike, setClassLike] = useState(defaultItemLikes ? styleLikeOn : styleLikeOff)

    const requestLiked = useCallback(async (...args) => {
        setIsNowRequest(true)
        likedItem(...args)
            .then(() => {
                if (classLike === styleLikeOn) {
                    setClassLike(styleLikeOff)
                    setResCountLikes(count => count - 1)
                } else if (classLike === styleLikeOff) {
                    setClassLike(styleLikeOn)
                    setResCountLikes(count => count + 1)
                }

                setIsNowRequest(false)
            })
            .catch((err) => {
                setIsNowRequest(false)

                if (err.response.status === 401) {
                    setOpenModal(true)
                }
                dispatch(actionForError(err))
            })
    }, [classLike, styleLikeOn, styleLikeOff, likedItem])

    return {
        resCountLikes,
        requestLiked,
        classLike,
        isNowRequest
    }
}