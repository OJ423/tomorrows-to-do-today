import listRouter from './listRouter';
import usersRouter from './usersRouter';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/users', usersRouter)
apiRouter.use('/lists', listRouter)

export default apiRouter