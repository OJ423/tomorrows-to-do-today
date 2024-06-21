import listItemsRouter from './listItemsRouter';
import listRouter from './listRouter';
import usersRouter from './usersRouter';
import { Router } from 'express';

const apiRouter = Router();

// To understand the project - follow the routers functions. Comments in the routers below provide some narrative.
apiRouter.use('/users', usersRouter)
apiRouter.use('/lists', listRouter)
apiRouter.use('/list-items', listItemsRouter)

export default apiRouter