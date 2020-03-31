import React, {useContext, useEffect} from 'react'

import AnimateModal from "../animate-modal"

import styles from './delete-items-modal.module.css'
import axiosRequest from "../../../services"
import {AuthContext} from "../../../context/AuthContext"

const DeleteItemsModal = ({items, operation, onClose}) => {

    const {token} = useContext(AuthContext)

    const itemsTitles = items.map(({cells, id}) => {
        return {
            id,
            title: cells[0].value
        }
    })

    const deleteItemsById = async () => {
        items.map(({id}) => axiosRequest.deleteItemById(token, id))
        await Promise.all(items)
    }

    return (
        <AnimateModal
            modalLabel={operation}
            primaryButtonText={operation}
            onRequestSubmit={deleteItemsById}
            onClose={onClose}
        >
            <div className={styles.centerDeleteModal}>
                <span>You really want to delete </span>
                {
                    itemsTitles.map(({id, title}, idx) => {
                        if (idx !== itemsTitles.length - 1) {
                            return (
                                <span key={id}><strong>«{title}»</strong>, </span>
                            )
                        } else {
                            return (
                                <span key={id}><strong>«{title}»</strong>?</span>
                            )
                        }
                    })
                }
            </div>
        </AnimateModal>
    )
}

export default DeleteItemsModal