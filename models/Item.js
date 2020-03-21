const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, required: true},
    title: {type: String, required: true},
    description: {type: String},
    tags: [{type: String}],
    someObject: {type: Buffer}
})

module.exports = model('Item', schema)
