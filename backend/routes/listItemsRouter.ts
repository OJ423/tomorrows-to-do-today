import Router from 'express';
import { validateData } from '../middleware/dataValidation';
import { listItemSchema } from '../schemas/listItemsSchema';
import { addListItemToList, deleteListItem, getListsItemsByList, toggleListItemComplete } from '../controllers/list-items.controllers';
import { authMiddleware } from '../middleware/authMiddleware';
import { listItemCompleteSchema } from '../schemas/listItemCompleteSchema';

const listItemsRouter = Router()

listItemsRouter.get('/:list_id', getListsItemsByList);
listItemsRouter.post('/:list_item_id', authMiddleware, validateData(listItemCompleteSchema), toggleListItemComplete);
listItemsRouter.post('/new/:list_id', authMiddleware, validateData(listItemSchema), addListItemToList);
listItemsRouter.delete('/delete/:list_item_id', authMiddleware, deleteListItem)

export default listItemsRouter