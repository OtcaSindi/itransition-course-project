const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

const router = Router()

router.post(
    '/register',
    [
        check('email', 'Invalid email.').isEmail(),
        //check('password', 'The minimum password length is 6 characters.').isLength({min: 6})
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Incorrect data during registration.',
                    errors: errors.array()
                })
            }

            const {
                email,
                password,
                name
            } = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                res.status(400).json({message: 'This user already exists.'})
            }

            const hashPassword = await bcrypt.hash(password, 12)

            const user = new User({
                email,
                name,
                password: hashPassword
            })

            await user.save()
            res.status(201).json({message: 'User created.'})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again.'})
        }
    }
)

router.post(
    '/login',
    [
        check('email', 'Please enter a valid email.').isEmail().normalizeEmail(),
        check('password', 'Enter password.').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login details.'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'User is not found.'})
            }

            if (user.blocked) {
                return res.status(400).json({message: 'This user is blocked.'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Invalid password, try again.'})
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                    userIsAdmin: user.isAdmin
                },
                config.get('jwtSecret')
            )
            await user.save()

            res.status(200).json({token, userId: user.id, userIsAdmin: user.isAdmin})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again.'})
        }
    }
)

module.exports = router
