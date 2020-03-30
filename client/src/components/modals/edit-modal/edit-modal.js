import React, {useContext, useState} from 'react'

import WrapperAnimateModal from "../wrapper-animate-modal"
import {useSelector} from "react-redux"
import {FileUploaderDropContainer, TextArea, TextInput} from "carbon-components-react"

import './edit-modal.css'
import styles from './edit-modal.module.css'
import axiosRequest from "../../../services"
import {AuthContext} from "../../../context/AuthContext"

const useSelectorItemById = (selector, id) => {
    const {data} = useSelector(selector)
    return data.find(i => i.id === id)
}

const EditModal = ({onClose, items}) => {

    const {token} = useContext(AuthContext)

    const {id} = items
    const {
        title: defaultTitle,
        description: defaultDescription,
        tags: defaultTags,
        image: defaultImage,
    } = useSelectorItemById(state => state.itemsReducer, id)

    const [title, setTitle] = useState(defaultTitle)
    const [description, setDescription] = useState(defaultDescription)
    const [tags, setTags] = useState(defaultTags)
    const [srcImage, setSrcImage] = useState(defaultImage)

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleTags = (e) => {
        setTags(e.target.value.split(' '))
    }

    const onHandleClose = (e, closeModal) => closeModal()

    const isChanged = () => {
        return !(defaultTitle === title &&
            defaultDescription === description &&
            defaultTags.join('') === tags.join('') &&
            defaultImage === srcImage)
    }

    const editItem = async (e, closeModal) => {
        if (isChanged()) {
            await axiosRequest.editItem(token, {title, description, tags, image: srcImage}, id)
        }
        closeModal()
    }

    return (
        <WrapperAnimateModal
            onRequestClose={onHandleClose}
            onClose={onClose}
            modalHeading={defaultTitle}
            modalLabel='Edit'
            primaryButtonText='Edit'
            onRequestSubmit={editItem}
            secondaryButtonText='Close'
            hasForm
        >
            <>
                <TextInput
                    labelText="Title"
                    id="title"
                    value={title}
                    onChange={handleTitle}/>
                <br/>
                <TextArea
                    labelText="Description"
                    id="description"
                    value={description}
                    onChange={handleDescription}/>
                <br/>
                <TextInput
                    labelText="Tags"
                    id="tags"
                    value={tags.join(' ')}
                    onChange={handleTags}/>
                <br/>

                <div className={styles.center}>
                    {srcImage &&
                    <img
                        className={styles.img}
                        id="target"
                        style={{height: '100px'}}
                        src={srcImage}
                        alt="item"
                    />
                    }
                </div>
                <br/>
                <FileUploaderDropContainer
                    accept={['.png', '.jpg']}
                    onAddFiles={(e, {addedFiles}) => {
                        const file = addedFiles[0]
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            setSrcImage(e.target.result)
                        }
                        reader.readAsDataURL(file)
                    }}
                    labelText="Drag and drop image(.png, .jpg) here or click to upload"
                    id="uploader"
                />
            </>
        </WrapperAnimateModal>
    )

}

export default EditModal