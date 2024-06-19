import { loginUser, registerUser, verifyAccount } from '../controllers/users-controllers'
import { Router } from 'express'
import { validateData } from '../middleware/dataValidation'
import { loginSchema, userRegistrationSchema } from '../schemas/userSchema'
import { authMiddleware } from '../middleware/authMiddleware'

const usersRouter = Router()

usersRouter.post('/register', validateData(userRegistrationSchema), registerUser);
usersRouter.get('/verify-email', authMiddleware, verifyAccount);
usersRouter.post('/login', validateData(loginSchema), loginUser)

export default usersRouter