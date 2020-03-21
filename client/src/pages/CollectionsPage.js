import React, {useContext, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router"

import CreateCollectionModal from "../components/create-collection-modal"
import {AuthContext} from "../context/AuthContext"
import Loader from "../components/loader"
import DownloadAllNotes from "../components/download-all-notes"
import CollectionsList from "../components/collections-list"
import {fetchCollections} from "../actionsCreator"

function CollectionsPage({idUser}) {

    const {loading} = useSelector(state => state.collectionsReducer)
    const {token, userId} = useContext(AuthContext)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (idUser === userId) {
            history.push('/collections')
        } else {
            dispatch(fetchCollections(token, idUser))
        }
    }, [dispatch, token, idUser])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="container">
            {idUser && <h5 className="center">User's (ID: {idUser}) collections</h5>}
            <div className="modal-and-download">
                <CreateCollectionModal idUser={idUser}/>
                <DownloadAllNotes/>
            </div>
            <CollectionsList idUser={idUser}/>
        </div>
    )
}

export default CollectionsPage
