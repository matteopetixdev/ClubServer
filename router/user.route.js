import express from 'express'

const router = express.Router()

import { getUsers, getUser, updateUser, deleteUser } from '../controller/user.controller.js'
import { verifyToken } from './../middleware/verifyToken.js';

router.get('/', getUsers)
router.get('/:id', verifyToken, getUser)
router.put('/:id', verifyToken, updateUser)
router.delete('/:id', verifyToken, deleteUser)


export default router