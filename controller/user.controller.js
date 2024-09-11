import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {

    try {

        const users = await prisma.user.findMany()

        res.status(200).json(users)


    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Get Users" })
    }
}

export const getUser = async (req, res) => {

    const id = req.params.id

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        res.status(200).json(user)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Get User" })
    }
}

export const updateUser = async (req, res) => {

    const id = req.params.id
    const tokenUserId = req.userId
    if (id !== tokenUserId) return res.status(403).json({ message: "Not Authorized" })

    const { email, password, username, avatar } = req.body

    let updatedPassword = undefined

    if (password) {
        updatedPassword = await bcrypt.hash(password, 10)
    }

    try {

        const userUpdated = await prisma.user.update({
            where: { id },
            data: {
                username: username,
                email: email,
                avatar: avatar,
                password: updatedPassword,
            }
        })

        res.status(200).json(userUpdated)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Update User" })
    }
}

export const deleteUser = async (req, res) => {

    const id = req.params.id
    const tokenUserId = req.userId
    if (id !== tokenUserId) return res.status(403).json({ message: "Not Authorized" })

    try {

        await prisma.user.delete({
            where: { id }
        })

        res.status(200).json({ message: "User Deleted" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Delete User" })
    }
}