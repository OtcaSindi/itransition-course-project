const User = require('../models/User')
const Collection = require('../models/Collection')

const getCollectionsAndUserByUserId = async (id) => {
    const collections = await Collection.find({owner: id})
    const user = await User.findOne({_id: id})
    return {
        collections,
        user,
    }
}

module.exports = getCollectionsAndUserByUserId