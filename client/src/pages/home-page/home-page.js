import React, {useContext, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"

import {fetchAllItemsMainPage} from "../../actionsCreator"
import {AuthContext} from "../../context/AuthContext"
import {itemsMainPageReducerSelector} from "../../selectors"
import styles from './home-page.module.css'
import {Loading} from "carbon-components-react"
import ItemHomePage from "../../components/item-home-page"

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

    return (
        <div className={styles.container}>
            {data.map((item) => {
                return (
                    <ItemHomePage item={item} limitTags={3}/>
                )
            })}
        </div>
    )
}

export default HomePage