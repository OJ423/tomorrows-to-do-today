import { Router } from 'express'
import { listSchema } from '../schemas/listSchema';
import { validateData } from '../middleware/dataValidation';
import { addList } from '../controllers/list-controllers';

const listRouter = Router()

listRouter.post('/', validateData(listSchema), addList);


export default listRouter