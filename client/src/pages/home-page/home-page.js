import React, {useContext, useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from "react-redux"

import {fetchAllItemsMainPage} from "../../actionsCreator"
import {AuthContext} from "../../context/AuthContext"
import {itemsMainPageReducerSelector} from "../../selectors"
import styles from './home-page.module.css'
import {Loading} from "carbon-components-react"
import ItemHomePage from "../../components/item-home-page"
import {storageName} from "../../hooks/use-auth"

const HomePage = ({options}) => {

    const {logout, setOpenModal, token} = useContext(AuthContext)
    const localStorageData = JSON.parse(localStorage.getItem(storageName))
    const tokenStorage = localStorageData ? localStorageData.token : null
    const dispatch = useDispatch()
    const {data, loading, errorStatus, user: {idLikedItems}} = useSelector(itemsMainPageReducerSelector)

    useEffect(() => {
        if (errorStatus === 401) {
            logout()
            setOpenModal(true)
        }
        dispatch(fetchAllItemsMainPage(tokenStorage, options))
    }, [token, tokenStorage, options, errorStatus])

    const items = useMemo(() => {
        return idLikedItems ? data.map((item) => {
            const isCheckLiked = idLikedItems.find((id) => item.id === id)
            return {
                ...item,
                itemLikes: !!isCheckLiked
            }
        }).reverse() : data.reverse()
    }, [data, idLikedItems])

    if (loading) {
        return <Loading className={styles.loader} withOverlay={false} description="Wait, please..."/>
    }

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