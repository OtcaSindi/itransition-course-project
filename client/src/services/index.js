import axios from 'axios'

const create = (baseURL = '') => {

    const api = axios.create({
        baseURL,
        headers: {
            'content-type': 'application/json',
        }
    })

    const setHeader = (token) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    const getUsers = async (token) => {
        setHeader(token)
        try {
            const response = await api.get('/api/users')
            if (response.status === 401) {
                throw new Error('No authorization.')
            }
            return response
        } catch (e) {
            throw e
        }
    }

    const deleteById = async (id, token) => {
        setHeader(token)
        try {
            const response = await api.delete(`/api/users/delete/${id}`)
            if (response.status === 401) {
                throw new Error('No authorization.')
            }
            return response
        } catch (e) {
            throw e
        }
    }

    const blockById = async (id, token) => {
        setHeader(token)
        try {
            const response = await api.post(`/api/users/block/${id}`)
            if (response.status === 401) {
                throw new Error('No authorization.')
            }
            return response
        } catch (e) {
            throw e
        }
    }

    const unblockById = async (id, token) => {
        setHeader(token)
        try {
            const response = await api.post(`/api/users/unblock/${id}`)
            if (response.status === 401) {
                throw new Error('No authorization.')
            }
            return response
        } catch (e) {
            throw e
        }
    }

    const makeAdminById = async (id, token) => {
        setHeader(token)
        try {
            const response = await api.post(`/api/users/make-admin/${id}`)
            if (response.status === 401) {
                throw new Error('No authorization.')
            }
            return response
        } catch (e) {
            throw e
        }
    }

    const logoutRequest = (token) => {
        setHeader(token)
        api.get('/api/users/logout')
    }

    const auth = async (form) => {
        const data = await api.post(
            '/api/auth/login',
            form
            )
        setHeader(data.token)
        return data
    }

    const getCollectionsById = async (token, userId) => {
        setHeader(token)
        return await api.get(`/api/collections/${userId}`)
    }

    const createCollection = async (token, form) => {
        setHeader(token)
        return await api.post('/api/collections/create', form)
    }

    const createCollectionById = async (token, form, userId) => {
        setHeader(token)
        return await api.post(`/api/collections/create/${userId}`, form)
    }

    const editCollectionById = async (token, form, collectionId) => {
        setHeader(token)
        return await api.post(`/api/collections/edit/${collectionId}`, form)
    }

    const deleteCollectionById = async (token, id) => {
        setHeader(token)
        return await api.delete(`/api/collections/delete/${id}`)
    }

    const getItemsByCollectionId = async (token, collectionId) => {
        setHeader(token)
        return await api.get(`/api/items/${collectionId}`)
    }

    const createItem = async (token, form, collectionId) => {
        setHeader(token)
        return await api.post(`/api/items/create/${collectionId}`, form)
    }

    const editItem = async (token, form, id) => {
        setHeader(token)
        return await api.post(`/api/items/edit/${id}`, form)
    }

    const addCommentByItemId = async (token, form, itemId) => {
        setHeader(token)
        return await api.post(`/api/items/${itemId}/create-comment`, form)
    }


    return {
        auth,
        getUsers,
        deleteById,
        blockById,
        unblockById,
        makeAdminById,
        logoutRequest,
        getCollectionsById,
        editCollectionById,
        deleteCollectionById,
        createCollection,
        createCollectionById,
        createItem,
        editItem,
        getItemsByCollectionId,
        addCommentByItemId
    }
}

const axiosRequest = create()

export default axiosRequest