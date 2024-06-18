import express from "express"
import apiRouter from "./routes/apiRouter"

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/api', apiRouter)

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

export {app, server}