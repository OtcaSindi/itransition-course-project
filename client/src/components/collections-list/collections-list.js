import React from "react"

import Collection from "../collection"
import {useSelector} from "react-redux"

const CollectionsList = ({idUser}) => {

    const {data} = useSelector(state => state.collectionsReducer)

    return (
        <div>
            {data.map(({id, title, description, themeColor, themeTitle}) => (
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
