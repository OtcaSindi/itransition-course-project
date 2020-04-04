import React, {useCallback, useContext, useState} from 'react'
import {useHistory} from "react-router"

import {imgHeart} from "../../image-svg"
import {likedItem} from "../../services"

import styles from "./item-home-page.module.css"
import {AuthContext} from "../../context/AuthContext"

const ItemHomePage = ({item, limitTags}) => {

    const {token} = useContext(AuthContext)

    const {id, title, image, countLikes, tags, comments, itemLikes} = item

    let tagsAfterLimit = []
    if (limitTags) {
        tagsAfterLimit = tags.slice(0, limitTags)
    }

    const [defaultCountLikes, setDefaultCountLikes] = useState(countLikes)
    const [defaultClassLike, setDefaultClassLike] = useState(itemLikes ? styles.likeOn : styles.likeOff)

    const history = useHistory()
    const historyPush = useCallback((itemId) => {
        return () => history.push(`/items/${itemId}`)
    }, [history])

    const userLikedItem = useCallback(async () => {
        await likedItem(token, id)
        if (defaultClassLike === styles.likeOn) {
            setDefaultClassLike(styles.likeOff)
            setDefaultCountLikes(count => count - 1)
        } else if (defaultClassLike === styles.likeOff) {
            setDefaultClassLike(styles.likeOn)
            setDefaultCountLikes(count => count + 1)
        }
    }, [token, id, defaultClassLike])

    return (
        <div className={styles.card}>
            {
                image ?
                    <img onClick={historyPush(id)}
                         className={styles.img}
                         src={image}
                         alt={title}/> :
                    <div onClick={historyPush(id)}
                         className={styles.fakeImg}
                    >
                        No picture
                    </div>
            }

            <div className={styles.cardTitleAndLikes}>
                <div className={styles.cardTitle}>
                    <strong>{title}</strong>
                </div>
                <div className={styles.countLikesAndHeart}>
                    <div>{defaultCountLikes}</div>
                    <img onClick={userLikedItem}
                         className={defaultClassLike}
                         src={imgHeart}/>
                </div>
            </div>
            <div className={styles.lengthComments}>Comments: {comments.length}</div>
            {tagsAfterLimit.map((tag, idx) => {
                return (
                    <div key={`tag${idx}`} className={styles.tag}>
                        {tag}
                    </div>
                )
            })}
        </div>
    )
}

export default ItemHomePage