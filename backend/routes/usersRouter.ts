import { getUserById, loginUser, registerUser, verifyAccount } from '../controllers/users-controllers'
import { Router } from 'express'
import { validateData } from '../middleware/dataValidation'
import { loginSchema, userRegistrationSchema } from '../schemas/userSchema'
import { authMiddleware } from '../middleware/authMiddleware'

const usersRouter = Router()

// Registers a user
usersRouter.post('/register', validateData(userRegistrationSchema), registerUser);
// Verifies user with email link - you need to set up email in the .env - Look at readme for details
usersRouter.get('/verify-email', verifyAccount);
// Get user profile details
usersRouter.get('/:user_id', authMiddleware, getUserById)
// Secure login and issue token 
usersRouter.post('/login', validateData(loginSchema), loginUser)

export default usersRouter