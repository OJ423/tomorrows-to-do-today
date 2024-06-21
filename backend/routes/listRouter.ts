import { Router } from 'express'
import { listSchema } from '../schemas/listSchema';
import { validateData } from '../middleware/dataValidation';
import { addList, deleteList, getListById, getListsByUser } from '../controllers/list-controllers';
import { authMiddleware } from '../middleware/authMiddleware';

const listRouter = Router()

// Get all lists for a user
listRouter.get('/all/:user_id', getListsByUser)
// Gets a single list and all of its to-do items
listRouter.get('/:list_id', getListById)
// Add a new list for a user 
listRouter.post('/:user_id', validateData(listSchema), authMiddleware, addList);
// Delete a user's list
listRouter.delete('/delete/:list_id', authMiddleware, deleteList)


export default listRouter