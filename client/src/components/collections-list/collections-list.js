import React from "react"

import Collection from "../collection"
import {useSelector} from "react-redux"

const CollectionsList = ({idUser}) => {

    const {collections} = useSelector(state => state.collectionsReducer)

    return (
        <div>
            {collections.map(({id, title, description, themeColor, themeTitle}) => (
                    <Collection
                        key={id}
                        idUser={idUser}
                        id={id}
                        title={title}
                        description={description}
                        color={themeColor}
                        theme={themeTitle}
                    />
            ))}
        </div>
    )
}

export default CollectionsList
