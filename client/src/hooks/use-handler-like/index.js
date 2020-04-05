import {useCallback, useState} from "react"

export const useHandlerLike = (
    {
        likedItem,
        countLikes: defaultCountLikes,
        itemLikes: defaultItemLikes,
        styleLikeOn,
        styleLikeOff
    }) => {

    const [resCountLikes, setResCountLikes] = useState(defaultCountLikes)
    const [classLike, setClassLike] = useState(defaultItemLikes ? styleLikeOn : styleLikeOff)

    const requestLiked = useCallback(async (...args) => {
        await likedItem(...args)
        if (classLike === styleLikeOn) {
            setClassLike(styleLikeOff)
            setResCountLikes(count => count - 1)
        } else if (classLike === styleLikeOff) {
            setClassLike(styleLikeOn)
            setResCountLikes(count => count + 1)
        }
    }, [classLike, styleLikeOn, styleLikeOff, likedItem])

    return {
        resCountLikes,
        requestLiked,
        classLike
    }
}