import React from 'react'

import styles from "./item-home-page.module.css"
import {imgHeart} from "../../image-svg"

const ItemHomePage = ({item, limitTags}) => {

    const {title, image, likes, tags, comments} = item

    let tagsAfterLimit = []
    if (limitTags) {
        tagsAfterLimit = tags.slice(0, limitTags)
    }

    return (
        <div className={styles.card}>
            {
                image ?
                    <img className={styles.img} src={image} alt={title}/> :
                    <div className={styles.fakeImg}>No picture</div>
            }

            <div className={styles.cardTitleAndLikes}>
                <div className={styles.cardTitle}>
                    <strong>{title}</strong>
                </div>
                <div className={styles.countLikesAndHeart}>
                    <div>{likes}</div>
                    <img className={styles.like} src={imgHeart}/>
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