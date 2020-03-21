const {Router} = require('express')

const auth = require('../middleware/auth.middleware')
const Note = require('../models/Collection') /////////////////////////

const router = new Router()

const notesForFront = (notes) => {
    return notes.map((note) => {
        return {
            id: note._id,
            title: note.title,
            content: note.content,
            color: note.color
        }
    })
}

router.post('/create', auth, async (req, res) => {
    try {
        const {title, content, color} = req.body
        const note = new Note({
            owner: req.user.userId,
            title,
            content,
            color
        })

        await note.save()
        res.status(201).json(note)
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({owner: req.user.userId})
        res.status(200).json(notesForFront(notes))
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/swap', auth, async (req, res) => {
    try {
        const {firstIndex, secondIndex} = req.body
        const notes = await Note.find({owner: req.user.userId})

        const {title, content, color} = notes[firstIndex]

        if (firstIndex > secondIndex) {
            for (let i = firstIndex - 1; i >= secondIndex; i--) {
                notes[i + 1].title = notes[i].title
                notes[i + 1].content = notes[i].content
                notes[i + 1].color = notes[i].color
                await notes[i + 1].save()
            }

            notes[secondIndex].title = title
            notes[secondIndex].content = content
            notes[secondIndex].color = color

            await notes[secondIndex].save()
        } else if (firstIndex < secondIndex) {
            for (let i = firstIndex; i < secondIndex; i++) {
                notes[i].title = notes[i + 1].title
                notes[i].content = notes[i + 1].content
                notes[i].color = notes[i + 1].color
                await notes[i].save()
            }

            notes[secondIndex].title = title
            notes[secondIndex].content = content
            notes[secondIndex].color = color

            await notes[secondIndex].save()
        }

        res.status(200).json(notesForFront(notes))
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Note.remove({_id: req.params.id, owner: req.user.userId})
        const notes = await Note.find({owner: req.user.userId})
        res.status(200).json(notesForFront(notes))
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/edit/:id', auth, async (req, res) => {
    try {
        await Note.updateOne({_id: req.params.id, owner: req.user.userId}, {...req.body})
        const notes = await Note.find({owner: req.user.userId})
        res.status(200).json(notesForFront(notes))
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

module.exports = router
