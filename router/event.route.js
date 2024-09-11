import express from 'express'

import { verifyAdmin } from '../middleware/verifyToken.js'
import { getEvents, getEvent, createEvent, editEvent, deleteEvent } from '../controller/event.controller.js'

const router = express.Router()


router.get('/', getEvents)

router.get('/:id', getEvent)

router.post('/create', verifyAdmin, createEvent)

router.put('/:id', verifyAdmin, editEvent)

router.delete('/:id', verifyAdmin, deleteEvent)


export default router