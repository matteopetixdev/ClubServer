import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'

export const signin = async (req, res) => {
    const { username, email, password } = req.body

    const userExistUsername = await prisma.user.findUnique({
        where: { username: username }
    })

    const userExistEmail = await prisma.user.findUnique({
        where: { email: email }
    })

    if (userExistUsername) return res.status(500).json({ message: "Failed to Create User" })
    if (userExistEmail) return res.status(500).json({ message: "Failed to Create User" })

    //mongodb operation
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Create User" })
    }

    res.status(201).json({ message: "User Created Successfully" })
}

export const login = async (req, res) => {
    const { username, password } = req.body

    const age = 1000 * 60 * 60 * 24 * 7

    try {

        const user = await prisma.user.findUnique({
            where: { username: username }
        })

        if (!user) return res.status(401).json({ message: "Invalid Credential" })

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credential" })

        const token = jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin,
            isManager: user.isManager

        }, process.env.JWT_SECRET_KEY,
            { expiresIn: age })

        res.cookie("token", token, {
            httpOnly: true
        }).json({ message: "Success" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Login" })
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Success" })
}