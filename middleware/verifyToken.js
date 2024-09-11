import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Not Authenticated" })

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).json({ message: "Token Not Valid" })

        req.userId = payload.id

        next()
    })
}

export const verifyAdmin = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Not Authenticated" })

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).json({ message: "Token Not Valid" })

        const isAdmin = payload.isAdmin
        const isManager = payload.isManager

        if (isAdmin == false && isManager == false) return res.status(401).json({ message: "Not Authorized" })

        req.userId = payload.id

        next()
    })
}

export const verifyManager = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Not Authenticated" })

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).json({ message: "Token Not Valid" })

        const isManager = payload.isManager

        if (!isManager) return res.status(401).json({ message: "Not Authorized" })

        req.userId = payload.id

        next()
    })
}