import listItemsRouter from './listItemsRouter';
import listRouter from './listRouter';
import usersRouter from './usersRouter';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/users', usersRouter)
apiRouter.use('/lists', listRouter)
apiRouter.use('/list-items', listItemsRouter)

export default apiRouter