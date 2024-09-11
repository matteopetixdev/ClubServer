import express from 'express'
import { verifyManager, verifyToken } from '../middleware/verifyToken.js'
import { acceptRequest, createRequest, deleteRequest, getAllRequest, getRequest } from '../controller/adminRequest.controller.js'

const router = express.Router()


router.post('/create', verifyToken, createRequest)

router.get('/', verifyManager, getAllRequest)

router.get('/:id', verifyManager, getRequest)

router.post('/accept', verifyManager, acceptRequest)

router.post('/delete', verifyManager, deleteRequest)


export default router