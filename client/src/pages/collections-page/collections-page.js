import React, {useContext, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import CreateCollectionModal from "../../components/create-collection-modal"
import {AuthContext} from "../../context/AuthContext"
import CollectionsList from "../../components/collections-list"
import {fetchCollections} from "../../actionsCreator"

function CollectionsPage({idUser}) {

    const {errorStatus} = useSelector(state => state.collectionsReducer)
    const {token, setOpenModal} = useContext(AuthContext)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCollections(token, idUser))
        if (errorStatus === 401) {
            setOpenModal(true)
        }
    }, [dispatch, token, idUser, errorStatus])

    return (
        <div className="container">
            <button onClick={() => setOpenModal(true)}>Hello</button>
            {idUser && <h5 className="center">User's (ID: {idUser}) collections</h5>}
            <div className="modal-and-download">
                <CreateCollectionModal idUser={idUser}/>
            </div>
            <CollectionsList idUser={idUser}/>
        </div>
    )
}

export default CollectionsPage
