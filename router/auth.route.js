import express from 'express'

const router = express.Router()

import { signin, login, logout } from '../controller/auth.controller.js'


router.post('/signin', signin)

router.post('/login', login)

router.post('/logout', logout)


export default router