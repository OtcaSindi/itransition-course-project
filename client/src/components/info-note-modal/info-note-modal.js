import React from "react"
import {Modal} from 'react-materialize'

import "materialize-css/dist/css/materialize.min.css"

const InfoNoteModal = ({title, description}) => {

    return (
        <Modal style={{width: '35%'}}
               actions={[
                   <button className="modal-close waves-effect waves-red btn-flat">
                       Cancel
                   </button>
               ]}
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
                   <div className="center">
                        <span className="card-title"
                              style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  maxHeight: '50px',
                                  whiteSpace: 'nowrap'
                              }}>{title}</span>
                       <p style={{
                           overflow: 'hidden',
                           textOverflow: 'ellipsis',
                           maxHeight: '50px',
                           whiteSpace: 'nowrap'
                       }}>{description}</p>
                   </div>
               }
        >
            <div className="center">
                <h3 style={{paddingTop: '5px'}} className="card-title">{title}</h3>
            </div>
            <div className="modal-content" style={{padding: '0', height: '150px'}}>
                <pre>
                    {description}
                </pre>
            </div>
        </Modal>
    )
}

export default InfoNoteModal

