import { Router } from 'express'
import { listSchema } from '../schemas/listSchema';
import { validateData } from '../middleware/dataValidation';
import { addList, getListById, getListsByUser } from '../controllers/list-controllers';
import { authMiddleware } from '../middleware/authMiddleware';

const listRouter = Router()

listRouter.get('/all/:user_id', getListsByUser)
listRouter.get('/:list_id', getListById)
listRouter.post('/:user_id', validateData(listSchema), authMiddleware, addList);


export default listRouter