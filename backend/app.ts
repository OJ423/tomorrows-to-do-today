import express from "express"
import apiRouter from "./routes/apiRouter"
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({ path: '.env' });

const PORT = process.env.PORT || 3000
const FRONTEND_URL = process.env.FRONTEND_URL || '*';

const app = express()
app.use(cors({
  origin: FRONTEND_URL
}));;
app.use(express.json())

app.use('/api', apiRouter)

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

export {app, server}