import React from "react"
import marked from 'marked'

import DropdownNote from "../dropdown-note"
import {useHistory} from "react-router"

const Collection = ({idUser, id, title, description, color, theme}) => {

    const history = useHistory()

    const cropString = (str) => {
        if (str.length > 255) {
            return str.slice(0, 255) + '...'
        }
        return str
    }

    const transitionOnCollectionDetails = () => {
        history.push(`/collections/${id}`)
    }

    const getMarkdownText = (text) => {
        const rawMarkup = marked(text, {sanitize: true});
        return { __html: rawMarkup };
    }

    return (
        <div className="card" onClick={transitionOnCollectionDetails}>
            <div className="card-content" style={{
                backgroundColor: color,
                padding: '0',
                maxHeight: '200px'
            }}>
                <div style={{
                    paddingLeft: '10px',
                    paddingTop: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div onClick={(e) => {e.stopPropagation()}}>
                        <DropdownNote idUser={idUser} collectionId={id} title={title} description={description} color={color}/>
                    </div>
                    <span style={{fontSize: '12px', paddingRight: '10px'}}>{theme}</span>
                </div>
                <span className="card-title activa  tor grey-text text-darken-4 center">{title}</span>
                <p style={{padding: '0 24px 24px 24px'}}>
                    {cropString(description + 'sdfasdfsd fasdfdas f asdf sdf asdf asdg er ygdf gwer gad fasd g3r fasd fawdt q34t sd gs gsfas fdfa sdf asdf sd fasd fasd f 4r  sdf qw fdghj gf hd  fas dfa sdf sdaf asd fasd fasd gdfh fdg jhrfdg q2345 6345y ert7m 8ug df gasd 7ygsadg df gasd g e4eg sd fyhwsa dh yw4 fger tum56rhbx rym 4hegdghwo rlvjlsk pfmnjlzsd fhpa jenuioyhfksdgpowjg jlsey g[sdnfklgh')}
                </p>

            </div>
        </div>
    )
}

export default Collection
