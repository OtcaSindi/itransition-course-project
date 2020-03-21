import React from "react"
import {Link} from "react-router-dom"
import marked from 'marked'

import DropdownNote from "../dropdown-note"

const Collection = ({idUser, id, title, description, color, theme}) => {

    const cropString = (str) => {
        if (str.length > 255) {
            return str.slice(0, 255) + '...'
        }
        return str
    }

    const getMarkdownText = (text) => {
        const rawMarkup = marked(text, {sanitize: true});
        return { __html: rawMarkup };
    }

    return (
        <div className="card">
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
                    <div>
                        <DropdownNote idUser={idUser} collectionId={id} title={title} description={description} color={color}/>
                    </div>
                    <span style={{fontSize: '12px', paddingRight: '10px'}}>{theme}</span>
                </div>
                <span className="card-title activator grey-text text-darken-4 center">{title}</span>
                <p style={{padding: '0 24px 24px 24px'}}>
                    {cropString(description)}
                </p>
                <div className="center" style={{padding: '10px', fontSize: '16px'}}>
                    <Link style={{color: 'red'}} to={`/items/${id}`}>View items</Link>
                </div>

            </div>
            <div className="card-reveal">
                <div className="card-title grey-text text-darken-4 center">{title}</div>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Collection
