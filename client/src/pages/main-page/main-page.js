import React, {useContext, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"

import {fetchAllItems} from "../../actionsCreator"
import {AuthContext} from "../../context/AuthContext"
import {itemsReducerSelector} from "../../selectors"
import styles from './main-page.module.css'
import {Loading, Tag} from "carbon-components-react"

const MainPage = () => {

    const {token} = useContext(AuthContext)
    const dispatch = useDispatch()
    const {data, loading} = useSelector(itemsReducerSelector)

    useEffect(() => {
        dispatch(fetchAllItems(token))
    }, [token, fetchAllItems])

    if (loading) {
        return <Loading className={styles.loader} withOverlay={false} description="Wait, please..."/>
    }

    const limitTags = 3

    return (
        <div className={styles.container}>
            {data.map(({id, image, title, likes, tags}) => {
                const limTags = tags.slice(0, limitTags)
                return (
                    <div key={id} className={styles.card}>
                        <img className={styles.img} src={image} alt={title}/>
                        <div><strong>{title}</strong></div>
                        <div>Likes: {likes}</div>
                        {limTags.map((tag) => {
                            return (
                                <div className={styles.tag}>{tag}</div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default MainPage