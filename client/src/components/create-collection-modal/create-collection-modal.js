import React, {useEffect, useState} from "react"

import {create} from "../../services"
import {THEME_MOVIES, THEME_GAMES, THEME_BOOKS} from "../../constants"
import {Modal, Button} from 'react-materialize'

import {useAuth} from "../../hooks/auth.hook"
import {useDispatch} from "react-redux"
import {createCollectionRequest} from "../../actionsCreator"

const CreateCollectionModal = ({idUser}) => {

    const {token} = useAuth()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [theme, setTheme] = useState(null)
    const [defaultTitle, setDefaultTitle] = useState('')
    const [defaultTags, setDefaultTags] = useState([])
    const dispatch = useDispatch()

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


    const createCollection = async () => {
        dispatch(createCollectionRequest(token,{
            title,
            description,
            themeTitle: theme.title,
            themeColor: theme.color,
            itemTitleDefault: defaultTitle,
            itemTagsDefault: defaultTags
        }, idUser))
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
               trigger={
                   <button
                       className="waves-effect blue darken-3 btn modal-trigger"
                       style={{flex: '1'}}
                       data-target="modal1"
                   >
                       Create collection
                   </button>
               }
        >
            <div className="center">
                <h3 style={{paddingTop: '5px'}} className="card-title">Create collection</h3>
            </div>
            <div className="modal-content" style={{padding: '0', height: '150px'}}>
                <div className="margin-bottom-null">
                    <div className="input-field col s12">
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={title}
                            onChange={changeTitle}
                        />
                        <label htmlFor="title">Title</label>
                    </div>

                    <div className="row margin-bottom-null">
                        <form className="col s12">
                            <div className="row margin-bottom-null">
                                <div className="input-field col s12">
                                        <textarea
                                            id="description"
                                            className="materialize-textarea"
                                            name="description"
                                            value={description}
                                            onChange={changeDescription}
                                        />
                                    <label htmlFor="description">Description</label>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
                <h5 className="margin-top-null">Select theme</h5>
                <div>
                    <p>
                        <label>
                            <input className="with-gap" name="theme" type="radio" onChange={changeTheme(THEME_MOVIES)}/>
                            <span>{THEME_MOVIES.title}</span>
                        </label>
                    </p>

                    <p>
                        <label>
                            <input className="with-gap" name="theme" type="radio" onChange={changeTheme(THEME_GAMES)}/>
                            <span>{THEME_GAMES.title}</span>
                        </label>
                    </p>

                    <p>
                        <label>
                            <input className="with-gap" name="theme" type="radio" onChange={changeTheme(THEME_BOOKS)}/>
                            <span>{THEME_BOOKS.title}</span>
                        </label>
                    </p>
                </div>

                <div className="default-values-create-collection">

                    <div className="input-field col s12">
                        <input
                            id="defaultTitle"
                            type="text"
                            name="defaultTitle"
                            value={defaultTitle}
                            onChange={changeDefaultTitle}
                        />
                        <label htmlFor="defaultTitle">Default title for items</label>
                    </div>

                    <div className="input-field col s12">
                        <input
                            id="defaultTags"
                            type="text"
                            name="defaultTags"
                            value={defaultTags.join(' ')}
                            onChange={changeDefaultTags}
                        />
                        <label htmlFor="defaultTags">Default tags for items</label>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '20px'}}>
                    <button className="modal-close waves-effect waves-red btn-flat">
                        Cancel
                    </button>
                    <button className="modal-close waves-effect waves-green btn-flat"
                            onClick={createCollection}>
                        Create
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default CreateCollectionModal
