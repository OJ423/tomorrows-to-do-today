import express from "express"
import prisma from "./client"

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

app.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password
      },
    })

    res.json(newUser)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})