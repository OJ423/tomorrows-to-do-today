import usersRouter from './usersRouter';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/users', usersRouter)

export default apiRouter