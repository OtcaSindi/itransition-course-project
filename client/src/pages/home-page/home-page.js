import React, {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"

import {fetchAllItemsMainPage} from "../../actionsCreator"
import {AuthContext} from "../../context/AuthContext"
import {itemsMainPageReducerSelector} from "../../selectors"
import styles from './home-page.module.css'
import {Loading} from "carbon-components-react"
import imgHeart from '../../image-svg'

const HomePage = ({options}) => {

    const {token} = useContext(AuthContext)
    const dispatch = useDispatch()
    const {data, loading} = useSelector(itemsMainPageReducerSelector)

    useEffect(() => {
        dispatch(fetchAllItemsMainPage(token, options))
    }, [token, options])

    if (loading) {
        return <Loading className={styles.loader} withOverlay={false} description="Wait, please..."/>
    }

    const limitTags = 3

    return (
        <div className={styles.container}>
            {data.map(({id, image, title, likes, tags, comments}) => {
                const limTags = tags.slice(0, limitTags)
                return (
                    <div key={id} className={styles.card}>
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
                        {limTags.map((tag, idx) => {
                            return (
                                <div key={`tag${idx}`} className={styles.tag}>
                                    {tag}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default HomePage