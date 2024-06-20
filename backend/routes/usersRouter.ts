import { getUserById, loginUser, registerUser, verifyAccount } from '../controllers/users-controllers'
import { Router } from 'express'
import { validateData } from '../middleware/dataValidation'
import { loginSchema, userRegistrationSchema } from '../schemas/userSchema'
import { authMiddleware } from '../middleware/authMiddleware'

const usersRouter = Router()

usersRouter.post('/register', validateData(userRegistrationSchema), registerUser);
usersRouter.get('/verify-email', verifyAccount);
usersRouter.get('/:user_id', authMiddleware, getUserById)
usersRouter.post('/login', validateData(loginSchema), loginUser)

export default usersRouter