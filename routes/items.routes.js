const {Router, Types} = require('express')

const Item = require('../models/Item')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.get('/:id', auth, async (req, res) => {
    try {
        const items = await Item.find({owner: req.params.id})
        res.status(200).json(items)
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        const {title, someObject} = req.body
        const item = new Item({
            owner: req.user.userId,
            title,
            someObject
        })
        await item.save()
        res.status(201).json(item)
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

module.exports = router
