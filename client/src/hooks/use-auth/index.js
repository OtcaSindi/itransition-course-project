import {useState, useCallback, useEffect} from 'react'

import axiosRequest from "../../services"

export const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userIsAdmin, setUserIsAdmin] = useState(false)

    const login = useCallback((token, userId, userIsAdmin) => {
        setToken(token)
        setUserId(userId)
        setUserIsAdmin(userIsAdmin)

        localStorage.setItem(storageName, JSON.stringify({
            token,
            userId,
            userIsAdmin,
        }))
    }, [])

    const logout = useCallback(async () => {
        const token = JSON.parse(localStorage.getItem(storageName)).token
        await axiosRequest.logoutRequest(token)
        setToken(null)
        setUserId(null)
        setUserIsAdmin(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data) {
            const {token, userId, userIsAdmin} = data
            login(token, userId, userIsAdmin)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, userIsAdmin, ready}
}
