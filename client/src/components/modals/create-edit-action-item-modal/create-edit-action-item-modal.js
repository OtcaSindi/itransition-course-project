import React, {useContext, useState} from 'react'
import {FileUploaderDropContainer, TextArea, TextInput} from "carbon-components-react"

import AnimateModal from "../animate-modal"
import {useSelectorItemById} from "../../../hooks/use-selector-item-by-id"
import {AuthContext} from "../../../context/AuthContext"

import './create-edit-action-item-modal.css'
import styles from './create-edit-action-item-modal.module.css'
import {itemsReducerSelector} from "../../../selectors"

const CreateEditActionItemModal = ({onClose, items, operation, collection, primaryRequest}) => {

    const {token} = useContext(AuthContext)

    let id = null
    let resDefaultTitle = ''
    let resDefaultTags = []
    if (items) {
        id = items[0].id
    }
    const {
        title: defaultTitle,
        description: defaultDescription,
        tags: defaultTags,
        image: defaultImage,
    } = useSelectorItemById(itemsReducerSelector, id)
    resDefaultTitle = defaultTitle
    resDefaultTags = defaultTags

    if (!id) {
        id = collection.id
        resDefaultTitle = collection.itemTitleDefault
        resDefaultTags = collection.itemTagsDefault
    }

    const [title, setTitle] = useState(resDefaultTitle)
    const [description, setDescription] = useState(defaultDescription)
    const [tags, setTags] = useState(resDefaultTags)
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

    const isChanged = () => {
        return !(defaultTitle === title &&
            defaultDescription === description &&
            defaultTags.join('') === tags.join('') &&
            defaultImage === srcImage)
    }

    const editItem = async () => {
        if (isChanged()) {
            await primaryRequest(token, {title, description, tags, image: srcImage}, id)
        }
    }

    return (
        <AnimateModal
            modalHeading={defaultTitle}
            modalLabel={operation}
            primaryButtonText={operation}
            onRequestSubmit={editItem}
            onClose={onClose}
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
                        src={srcImage}
                        alt="item"
                    />
                    }
                </div>
                <br/>
                <FileUploaderDropContainer
                    accept={['.png']}
                    onAddFiles={(e, {addedFiles}) => {
                        const file = addedFiles[0]
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            setSrcImage(e.target.result)
                        }
                        reader.readAsDataURL(file)
                    }}
                    labelText="Drag and drop image(.png) here or click to upload"
                    id="uploader"
                />
            </>
        </AnimateModal>
    )
}

export default CreateEditActionItemModal