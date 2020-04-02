const {Router} = require('express')

const Collection = require('../models/Collection')
const auth = require('../middleware/auth.middleware')
const checkAdmin = require('../middleware/admin.middleware')
const collectionsForFront = require('../data-for-front/collections-for-front')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        const collections = await Collection.find({owner: req.user.userId})
        res.status(200).json(collectionsForFront(collections))
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.get('/:id', auth, checkAdmin, async (req, res) => {
    try {
        const collections = await Collection.find({owner: req.params.id})
        res.status(200).json(collectionsForFront(collections))
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        const {title, description, theme, image, itemTitleDefault, itemTagsDefault} = req.body
        const collection = new Collection({
            owner: req.user.userId,
            title,
            theme,
            description,
            image: new Buffer(image),
            itemTitleDefault,
            itemTagsDefault
        })
        await collection.save()
        const collections = await Collection.find({owner: req.user.userId})
        res.status(201).json(collectionsForFront(collections))
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/edit/:id', auth, async (req, res) => {
    try {
        await Collection.updateOne({_id: req.params.id}, {...req.body})
        res.status(200).json({message: 'User changed.'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/create/:id', auth, checkAdmin, async (req, res) => {
    try {
        const {title, description, themeTitle, themeColor, itemTitleDefault, itemTagsDefault} = req.body
        const collection = new Collection({
            owner: req.params.id,
            title,
            themeTitle,
            themeColor,
            description,
            itemTitleDefault,
            itemTagsDefault
        })
        await collection.save()
        const collections = await Collection.find({owner: req.params.id})
        res.status(201).json(collectionsForFront(collections))
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.delete('/delete/:id', auth, checkAdmin, async (req, res) => {
    try {
        await Collection.remove({_id: req.params.id})
        const collections = await Collection.find({owner: req.user.userId})
        res.status(200).json(collectionsForFront(collections))
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

module.exports = router
