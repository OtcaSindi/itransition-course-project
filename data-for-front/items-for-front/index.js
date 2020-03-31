const itemsForFront = (items) => {
    return items.map(({_id, title, description, image, tags, likes, dateCreation, comments}) => {
        const imageToString = image ? image.toString() : image
        return {
            id: _id,
            title,
            description,
            image: imageToString,
            tags,
            likes,
            dateCreation,
            comments
        }
    })
}

module.exports = itemsForFront