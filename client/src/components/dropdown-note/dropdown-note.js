import React from "react"

import {Dropdown} from 'react-materialize'

import {useAuth} from "../../hooks/auth.hook"
import EditCollectionModal from "../edit-collection-modal"
import {useDispatch} from "react-redux"
import {
    deleteCollectionRequest
} from "../../actionsCreator"

const DropdownNote = ({idUser, collectionId}) => {

    const {token} = useAuth()
    const dispatch = useDispatch()

    const removeNoteById = (id) => async () => {
        dispatch(deleteCollectionRequest(token, id, idUser))
    }

    return (
        <Dropdown
            options={{
                alignment: 'left',
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                container: null,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250
            }}
            trigger={<i
                style={{
                    border: "1px solid black",
                    borderRadius: '20%'
                }}
                className="material-icons">edit</i>}
        >
            <EditCollectionModal collectionId={collectionId} userId={idUser}/>
            <a onClick={removeNoteById(collectionId)}>
                Delete
            </a>
        </Dropdown>
    )
}

export default DropdownNote
