import { registerUser } from '../controllers/users-controllers'
import { Router } from 'express'
import { validateData } from '../middleware/dataValidation'
import { userRegistrationSchema } from '../schemas/userSchema'

const usersRouter = Router()

usersRouter.post('/register', validateData(userRegistrationSchema), registerUser)

export default usersRouter