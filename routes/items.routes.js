const {Router} = require('express')

const auth = require('../middleware/auth.middleware')
const Item = require('../models/Item')
const Collection = require('../models/Collection')

const router = Router()

router.get('/:idCollection', auth, async (req, res) => {
    try {
        const items = await Item.find({owner: req.params.idCollection})
        res.status(200).json(items)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/create/:id', auth, async (req, res) => {
    try {
        const idCollection = req.params.id
        const {title, description, tags} = req.body
        const collection = await Collection.findById(idCollection)
        const allTags = [...collection.itemTagsDefault, ...tags]
        const item = new Item({
            owner: idCollection,
            title,
            description,
            tags: allTags
        })
        await item.save()
        res.status(201).json(item)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/:id/create-comment', auth, async (req, res) => {
    try {
        const idItem = req.params.id
        const {comment} = req.body

        const item = await Item.findById(idItem)
        item.comments.push({user: req.user.userId, comment}) // переделать на про просто req.user(админ может удалять любые комменты)
        await item.save()

        res.status(201).json({message: 'Comment created.'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

module.exports = router
