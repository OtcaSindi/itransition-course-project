const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, required: true},
    title: {type: String, required: true},
    description: {type: String},
    tags: [{type: String}],
    dateCreation: {type: Date, default: Date.now},
    comments: [
        {
            user: {type: Types.ObjectId},
            comment: {type: String}
        }
    ]
})

module.exports = model('Item', schema)
