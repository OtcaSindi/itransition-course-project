const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, required: true},
    title: {type: String, required: true},
    description: {type: String},
    image: {type: Buffer, contentType: 'image/png'},
    tags: [{type: String}],
    likes: {type: Number, default: 0},
    dateCreation: {type: Date, default: Date.now},
    comments: [
        {
            user: {type: Types.ObjectId},
            comment: {type: String}
        }
    ]
})

module.exports = model('Item', schema)
