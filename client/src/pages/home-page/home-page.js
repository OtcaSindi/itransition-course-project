import React, {useContext, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"

import {fetchAllItemsMainPage} from "../../actionsCreator"
import {AuthContext} from "../../context/AuthContext"
import {itemsMainPageReducerSelector} from "../../selectors"
import styles from './home-page.module.css'
import {Loading} from "carbon-components-react"
import ItemHomePage from "../../components/item-home-page"

const HomePage = ({options}) => {

    const {token, logout} = useContext(AuthContext)
    const dispatch = useDispatch()
    const {data, loading, errorStatus, user: {idLikedItems}} = useSelector(itemsMainPageReducerSelector)

    useEffect(() => {
        if (errorStatus === 401) {
            logout()
        } else if (token) {
            dispatch(fetchAllItemsMainPage(token, options))
        }
    }, [token, options, errorStatus])

    if (loading) {
        return <Loading className={styles.loader} withOverlay={false} description="Wait, please..."/>
    }

    const items = data.map((item) => {
        const isCheckLiked = idLikedItems.find((id) => item.id === id)
        return {
            ...item,
            itemLikes: !!isCheckLiked
        }
    })

    return (
        <div className={styles.container}>
            {items.map((item) => {
                return (
                    <ItemHomePage
                        key={item.id}
                        item={item}
                        limitTags={3}
                    />
                )
            })}
        </div>
    )
}

export default HomePage