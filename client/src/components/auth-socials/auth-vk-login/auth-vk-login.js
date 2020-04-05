import React, {useContext} from 'react'
import VkLogin from "react-vkontakte-login"

import {AuthContext} from "../../../context/AuthContext"
import {useHttp} from "../../../hooks/use-http"

import styles from '../auth-socials.module.css'
import {useResetAllErrors} from "../../../hooks/use-reset-all-errors"

const AuthVkLogin = () => {

    const authorization = useContext(AuthContext)
    const {request} = useHttp()
    const {resetAllErrors} = useResetAllErrors()

    const vkResponse = async (res) => {
        const {first_name, last_name, id, href} = res.session.user
        const authData = {
            email: `${href}`,
            name: `${first_name} ${last_name}`,
            password: id,
        }
        const {token, userId, userIsAdmin} = await request('/api/auth/social', 'POST', authData)
        resetAllErrors()
        authorization.login(token, userId, userIsAdmin)
    }

    return (
        <VkLogin
            apiId="7379867"
            callback={vkResponse}
            render={renderProps => (
                <img
                    className={styles.logoAuthVk}
                    alt="vk"
                    src="https://cdn.worldvectorlogo.com/logos/vkcom.svg"
                    onClick={renderProps.onClick}
                />
            )}
        />
    )
}

export default AuthVkLogin