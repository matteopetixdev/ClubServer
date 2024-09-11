import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './router/auth.route.js'
import userRoutes from './router/user.route.js'
import eventRoutes from './router/event.route.js'
import adminRequestRoute from './router/adminRequest.route.js'
import cookieParser from 'cookie-parser'
import { verifyToken, verifyAdmin } from './middleware/verifyToken.js';

const PORT = process.env.PORT
const app = express()


dotenv.config()
app.use(express.json())
app.use(cookieParser())

//routes


app.use('/auth', authRoutes)

app.use('/user', userRoutes)

app.use('/event', eventRoutes)

app.use('/request', adminRequestRoute)

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})