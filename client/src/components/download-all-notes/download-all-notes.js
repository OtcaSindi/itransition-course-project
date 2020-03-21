import React from "react"
import {Button} from 'react-materialize'
import {useSelector} from "react-redux"

const DownloadAllNotes = () => {

    const collections = useSelector(state => state.collectionsReducer.collections)
    let result = ''
    for (let i = 0; i < collections.length; i++) {
        result += `Note: ${collections[i].title}\nDescription: ${collections[i].content}\n\n`
    }
    if (!result) {
        result = 'You have no notes.'
    }

    return (
        <Button
            className="waves-effect blue darken-3 btn modal-trigger center"
            style={{flex: '1'}}
            node="button"
            tooltip="Download all notes"
            waves="light"
        >
            <a style={{color: 'white'}}
               href={'data:text/plain;charset=UTF-8,' + encodeURIComponent(result)}
               download="allNotes.txt">
                Download all collections
            </a>
        </Button>
    )
}

export default DownloadAllNotes
