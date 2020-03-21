const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    blocked: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    collections: [{type: Types.ObjectId, ref: 'Collection'}]
})

module.exports = model('User', userSchema)
