import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {THEME_MOVIES, THEME_GAMES, THEME_BOOKS} from "../../constants"
import {Modal} from 'react-materialize'

import {useAuth} from "../../hooks/auth.hook"
import {useMessage} from "../../hooks/message.hook"
import {editCollectionRequest, fetchCollections} from "../../actionsCreator"

const EditCollectionModal = ({collectionId, userId}) => {

    const {token} = useAuth()

    const {collections} = useSelector(state => state.collectionsReducer)
    const collection = collections.find(({id}) => id === collectionId)

    const [title, setTitle] = useState(collection.title)
    const [description, setDescription] = useState(collection.description)
    const [theme, setTheme] = useState({title: collection.themeTitle, color: collection.themeColor})
    const [defaultTitle, setDefaultTitle] = useState(collection.itemTitleDefault)
    const [defaultTags, setDefaultTags] = useState(collection.itemTagsDefault)
    const dispatch = useDispatch()

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const editCollection = async () => {
        dispatch(editCollectionRequest(token,{
            title,
            description,
            themeTitle: theme.title,
            themeColor: theme.color,
            itemTitleDefault: defaultTitle,
            itemTagsDefault: defaultTags
        }, collectionId, userId))
    }

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    const changeTheme = (theme) => () => {
        setTheme(theme)
    }

    const changeDefaultTitle = (e) => {
        setDefaultTitle(e.target.value)
    }

    const changeDefaultTags = (e) => {
        setDefaultTags(e.target.value.split(' '))
    }

    return (
        <Modal style={{width: '35%', height: '65%'}}
            actions={[]}
            id="modal-0"
            options={{
                dismissible: true,
                endingTop: '10%',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                startingTop: '4%'
            }}
            trigger={<a>Edit</a>}
        >
            <div className="center">
                <h3 style={{paddingTop: '5px'}} className="card-title">Edit collection</h3>
            </div>
            <div className="modal-content" style={{padding: '0', height: '150px'}}>
                <div className="margin-bottom-null">
                    <div className="input-field col s12">
                        <input
                            id={`title${collectionId}`}
                            type="text"
                            name="title"
                            value={title}
                            onChange={changeTitle}
                        />
                        <label htmlFor={`title${collectionId}`}>Title</label>
                    </div>

                    <div className="row margin-bottom-null">
                        <form className="col s12">
                            <div className="row margin-bottom-null">
                                <div className="input-field col s12">
                                        <textarea
                                            id={`description${collectionId}`}
                                            className="materialize-textarea"
                                            name="description"
                                            value={description}
                                            onChange={changeDescription}
                                        />
                                    <label htmlFor={`description${collectionId}`}>Description</label>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
                <h5 className="margin-top-null">Select theme</h5>
                <div>
                    <p>
                        <label>
                            <input className="with-gap"
                                   name="theme"
                                   type="radio"
                                   onChange={changeTheme(THEME_MOVIES)}
                                   defaultChecked={theme.title === THEME_MOVIES.title}
                            />
                            <span>{THEME_MOVIES.title}</span>
                        </label>
                    </p>

                    <p>
                        <label>
                            <input className="with-gap"
                                   name="theme"
                                   type="radio"
                                   onChange={changeTheme(THEME_GAMES)}
                                   defaultChecked={theme.title === THEME_GAMES.title}
                            />
                            <span>{THEME_GAMES.title}</span>
                        </label>
                    </p>

                    <p>
                        <label>
                            <input className="with-gap"
                                   name="theme"
                                   type="radio"
                                   onChange={changeTheme(THEME_BOOKS)}
                                   defaultChecked={theme.title === THEME_BOOKS.title}
                            />
                            <span>{THEME_BOOKS.title}</span>
                        </label>
                    </p>
                </div>

                <div className="default-values-create-collection">

                    <div className="input-field col s12">
                        <input
                            id={`defaultTitle${collectionId}`}
                            type="text"
                            name="defaultTitle"
                            value={defaultTitle}
                            onChange={changeDefaultTitle}
                        />
                        <label htmlFor={`defaultTitle${collectionId}`}>Default title for items</label>
                    </div>

                    <div className="input-field col s12">
                        <input
                            id={`defaultTags${collectionId}`}
                            type="text"
                            name="defaultTags"
                            value={defaultTags.join(' ')}
                            onChange={changeDefaultTags}
                        />
                        <label htmlFor={`defaultTags${collectionId}`}>Default tags for items</label>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '20px'}}>
                    <button className="modal-close waves-effect waves-red btn-flat">
                        Cancel
                    </button>
                    <button className="modal-close waves-effect waves-yellow btn-flat"
                            onClick={editCollection}>
                        Edit
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default EditCollectionModal

