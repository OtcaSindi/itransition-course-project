const {Router} = require('express')
const path = require('path')

const auth = require('../middleware/auth.middleware')
const Item = require('../models/Item')
const Collection = require('../models/Collection')
const itemsForFront = require('../data-for-front/items-for-front')
const collectionsForFront = require('../data-for-front/collections-for-front')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).json(itemsForFront(items))
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.get('/:idCollection', auth, async (req, res) => {
    try {
        const {idCollection} = req.params
        const items = await Item.find({owner: idCollection})
        const collection = await Collection.findOne({_id: idCollection})
        res.status(200).json({items: itemsForFront(items), collection: collectionsForFront([collection])[0]})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/create/:idCollection', auth, async (req, res) => {
    try {
        const {idCollection} = req.params
        const {title, description, image, tags} = req.body
        const collection = await Collection.findById(idCollection)
        const allTags = Array.from(new Set([...collection.itemTagsDefault, ...tags]))

        const item = new Item({
            owner: idCollection,
            title,
            image: new Buffer(image),
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
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Item.deleteOne({_id: req.params.id})
        res.status(200).json({message: 'Item successfully deleted.'})
    } catch (e) {
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
