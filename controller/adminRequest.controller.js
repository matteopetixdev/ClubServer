import { request } from 'express'
import prisma from '../lib/prisma.js'

export const createRequest = async (req, res) => {
    const userId = req.userId

    const findRequest = await prisma.request.findUnique({
        where: {
            userId: userId
        }
    })

    if (findRequest) return res.status(500).json({ message: "Failed to Create Request" })

    try {
        const newUser = await prisma.request.create({
            data: {
                userId: userId
            }
        })
        res.status(201).json({ message: "Success to Create Request" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error to Create Request" })
    }
}

export const getAllRequest = async (req, res) => {
    try {
        const request = await prisma.request.findMany()

        res.status(200).json(request)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Get Request" })
    }
}

export const getRequest = async (req, res) => {

    const id = req.params.id

    try {
        const request = await prisma.request.findUnique({
            where: {
                id: id
            }
        })

        res.status(200).json(request)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Get Request" })
    }
}

export const acceptRequest = async (req, res) => {
    // Estrai l'ID dalla richiesta
    const { id } = req.body;


    try {
        // Cerca la richiesta con l'ID specificato
        const request = await prisma.request.findUnique({
            where: {
                id: id,
            },
        });


        // Se la richiesta non esiste, restituisce un errore 404
        if (!request) {
            return res.status(404).json({ message: "Failed to Accept Request" });
        }


        const userId = request.userId;

        console.log(userId)

        const editUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                isAdmin: true,
            },
        });

        // Aggiorna lo stato della richiesta impostandola come accettata
        const acceptedRequest = await prisma.request.update({
            where: {
                id: id,
            },
            data: {
                status: "Accepted",
            },
        });

        res.status(200).json({ message: "Success to Accept Request" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to Accept Request" });
    }
}


export const deleteRequest = async (req, res) => {
    const { id } = req.body

    const request = await prisma.request.findUnique({
        where: {
            id: id
        }
    })

    if (!request) return res.status(404).json({ message: "Failed to Accept Request" })

    try {
        const deletedRequest = await prisma.request.update({
            where: {
                id: id
            },
            data: {
                status: "Deleted"
            }
        })
        res.status(200).json({ message: "Success to Delete Request" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Accept Request" })
    }
}