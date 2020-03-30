const {Router} = require('express')
const path = require('path')

const auth = require('../middleware/auth.middleware')
const Item = require('../models/Item')
const Collection = require('../models/Collection')

const router = Router()

const itemsForFront = (items) => {
    return items.map(({_id, title, description, image, tags, likes, dateCreation, comments}) => {
        const imageToString = image ? image.toString() : image
        console.log(imageToString)
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

router.get('/:idCollection', auth, async (req, res) => {
    try {
        const items = await Item.find({owner: req.params.idCollection})
        res.status(200).json(itemsForFront(items))
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/create/:id', auth, async (req, res) => {
    try {
        const idCollection = req.params.id
        const {title, description, image, tags} = req.body
        const collection = await Collection.findById(idCollection)
        const allTags = [...collection.itemTagsDefault, ...tags]
        const item = new Item({
            owner: idCollection,
            title,
            image,
            description,
            tags: allTags
        })
        await item.save()
        res.status(201).json(item)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/edit/:id', auth, async (req, res) => {
    try {
        const item = await Item.updateOne({_id: req.params.id}, {...req.body, image: new Buffer(req.body.image)})
        res.status(200).json(item)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/:idItem/create-comment', auth, async (req, res) => {
    try {
        const {comment} = req.body
        const item = await Item.findById(req.params.idItem)
        item.comments.push({user: req.user.userId, comment}) // переделать на про просто req.user(админ может удалять любые комменты)
        await item.save()

        res.status(201).json({message: 'Comment created.'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

module.exports = router
