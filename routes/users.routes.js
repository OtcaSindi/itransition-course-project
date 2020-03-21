const {Router} = require('express')

const User = require('../models/User')
const Collection = require('../models/Collection')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find()
        const usersForFront = users.map(({_id, name, email, blocked, isAdmin}) => {
            return {
                id: _id,
                name,
                email,
                blocked,
                isAdmin
            }
        })
        res.status(200).json(usersForFront)
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await User.remove({_id: req.params.id})
        await Collection.remove({owner: req.params.id})
        res.status(200).json({message: 'User has been deleted.'})
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/block/:id', auth, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {blocked: true})
        res.status(200).json({message: 'User changed.'})
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/unblock/:id', auth, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {blocked: false})
        res.status(200).json({message: 'User changed.'})
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/make-admin/:id', auth, async (req, res) => { // add middleware for check admin!
    try {
        const user = await User.findById(req.params.id)
        if (!user.isAdmin) {
            user.isAdmin = true
            await user.save()
            res.status(200).json({message: 'User is now admin.'})
        } else {
            res.status(202).json({message: 'User is already admin.'})
        }
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

module.exports = router
