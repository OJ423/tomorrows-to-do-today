import { Router } from 'express'
import { listSchema } from '../schemas/listSchema';
import { validateData } from '../middleware/dataValidation';
import { addList, deleteList, getListById, getListsByUser } from '../controllers/list-controllers';
import { authMiddleware } from '../middleware/authMiddleware';

const listRouter = Router()

listRouter.get('/all/:user_id', getListsByUser)
listRouter.get('/:list_id', getListById)
listRouter.post('/:user_id', validateData(listSchema), authMiddleware, addList);
listRouter.delete('/delete/:list_id', authMiddleware, deleteList)


export default listRouter