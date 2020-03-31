const collectionsForFront = (collections) => {
    return collections.map(({_id, title, description, themeTitle, themeColor, itemTitleDefault, itemTagsDefault}) => {
        return {
            id: _id,
            title,
            description,
            themeTitle,
            themeColor,
            itemTitleDefault,
            itemTagsDefault
        }
    })
}

module.exports = collectionsForFront