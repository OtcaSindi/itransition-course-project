import {useState, useCallback, useEffect} from 'react'

export const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [idLikedItems, setIdLikedItems] = useState(null)
    const [userIsAdmin, setUserIsAdmin] = useState(false)

    const login = useCallback((token, userId, userIsAdmin, setIdLikedItems) => {
        setToken(token)
        setUserId(userId)
        setUserIsAdmin(userIsAdmin)

        localStorage.setItem(storageName, JSON.stringify({
            token,
            userId,
            userIsAdmin,
            idLikedItems
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserIsAdmin(null)
        setIdLikedItems([])
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data) {
            const {token, userId, userIsAdmin, setIdLikedItems} = data
            login(token, userId, userIsAdmin, setIdLikedItems)
        }
    }, [])

    return {login, logout, token, userId, userIsAdmin, idLikedItems}
}
