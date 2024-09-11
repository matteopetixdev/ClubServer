import prisma from "../lib/prisma.js"

export const getEvents = async (req, res) => {
    try {

        const events = await prisma.event.findMany()

        res.status(200).json(events)


    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Get Events" })
    }
}

export const getEvent = async (req, res) => {
    const id = req.params.id

    try {
        const event = await prisma.event.findUnique({
            where: {
                id: id
            }
        })

        res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Get Event" })
    }
}

export const createEvent = async (req, res) => {
    const { name, description, type, photo, date } = req.body

    try {

        const parsedDate = new Date(date);

        const newEvent = await prisma.event.create({
            data: {
                name,
                description,
                type,
                photo,
                date: parsedDate
            }
        })
        res.status(201).json({ message: "Event Created Successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Create Event" })
    }
}

export const editEvent = async (req, res) => {
    const id = req.params.id

    const { name, description, type, photo, date } = req.body

    try {

        const eventUpdated = await prisma.event.update({
            where: { id },
            data: {
                name,
                description,
                type,
                photo,
                date
            }
        })

        res.status(200).json(eventUpdated)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Update Event" })
    }
}

export const deleteEvent = async (req, res) => {
    const id = req.params.id

    try {

        await prisma.event.delete({
            where: { id }
        })

        res.status(200).json({ message: "Event Deleted" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to Delete Event" })
    }
}