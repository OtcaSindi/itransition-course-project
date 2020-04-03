import React, {useContext} from 'react'

import AnimateModal from "../animate-modal"

import styles from './delete-collections-modal.module.css'
import {AuthContext} from "../../../context/AuthContext"

const DeleteCollectionsModal = ({items, operation, onClose, primaryRequest}) => {

    const {token} = useContext(AuthContext)

    const collectionTitlesAndTheme = items.map(({cells, id}) => {
        return {
            id,
            title: cells[0].value,
            theme: cells[4].value
        }
    })

    const deleteCollectionsById = async () => {
        items.map(({id}) => primaryRequest(token, id))
        await Promise.all(items)
    }

    return (
        <AnimateModal
            modalLabel={operation}
            primaryButtonText={operation}
            onRequestSubmit={deleteCollectionsById}
            onClose={onClose}
        >
            <div className={styles.centerDeleteModal}>
                <span>You really want to delete </span>
                {
                    collectionTitlesAndTheme.map(({id, title, theme}, idx) => {
                        if (idx !== collectionTitlesAndTheme.length - 1) {
                            return (
                                <span key={id}><strong>«{title} ({theme})»</strong>, </span>
                            )
                        } else {
                            return (
                                <span key={id}><strong>«{title} ({theme})»</strong>?</span>
                            )
                        }
                    })
                }
            </div>
        </AnimateModal>
    )
}

export default DeleteCollectionsModal