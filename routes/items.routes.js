const {Router} = require('express')
const {Types} = require('mongoose')

const auth = require('../middleware/auth.middleware')
const Item = require('../models/Item')
const Collection = require('../models/Collection')
const User = require('../models/User')
const itemsForFront = require('../data-for-front/items-for-front')
const collectionsForFront = require('../data-for-front/collections-for-front')
const {uniqueTags} = require('../utilities-functions')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        const {search} = req.query
        const user = await User.findOne({_id: req.user.userId})

        let items = []
        if (search) {
            await Item.syncIndexes()
            items = await Item.find({$text: {$search: search}})
        } else {
            items = await Item.find()
        }

        res.status(200).json({items: itemsForFront(items), user})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.get('/:idCollection', auth, async (req, res) => {
    try {
        const {idCollection} = req.params
        const items = await Item.find({owner: idCollection})
        const collection = await Collection.findOne({_id: idCollection})
        res.status(200).json({
            items: itemsForFront(items),
            collection: collectionsForFront([collection])[0]
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/create/:idCollection', auth, async (req, res) => {
    try {
        const {idCollection} = req.params
        const {title, description, image, tags} = req.body
        const collection = await Collection.findById(idCollection)
        const item = new Item({
            owner: idCollection,
            title,
            image: new Buffer(image),
            description,
            tags: uniqueTags([...collection.itemTagsDefault, ...tags])
        })
        await item.save()
        res.status(201).json(itemsForFront([item])[0])
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/edit/:id', auth, async (req, res) => {
    try {
        const {title, description, image, tags} = req.body
        const item = await Item.updateOne({_id: req.params.id},
            {title, description, image: new Buffer(image), tags: uniqueTags(tags)})
        res.status(200).json(item)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Item.deleteOne({_id: req.params.id})
        res.status(200).json({message: 'Item successfully deleted'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/:idItem/create-comment', auth, async (req, res) => {
    try {
        const {comment} = req.body
        const item = await Item.findById(req.params.idItem)
        item.comments.push({user: req.user.userId, comment}) // переделать на про просто req.user(админ может удалять любые комменты)
        await item.save()
        res.status(201).json({message: 'Comment created'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/liked/:itemId', auth, async (req, res) => {
    try {
        const {itemId} = req.params
        const item = await Item.findOne({_id: itemId})
        const user = await User.findOne({_id: req.user.userId})

        const idxAlreadyLike = user.idLikedItems
            .findIndex((id) => id.toString() === itemId)
        if (idxAlreadyLike !== -1) {
            item.countLikes--
            user.idLikedItems.splice(idxAlreadyLike, 1)
        } else {
            item.countLikes++
            user.idLikedItems.push(Types.ObjectId(itemId))
        }
        await item.save()
        await user.save()

        res.status(200).json({message: 'User successfully liked item'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

module.exports = router
