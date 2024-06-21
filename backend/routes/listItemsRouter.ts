import Router from 'express';
import { validateData } from '../middleware/dataValidation';
import { listItemSchema } from '../schemas/listItemsSchema';
import { addListItemToList, deleteListItem, getListsItemsByList, toggleListItemComplete } from '../controllers/list-items.controllers';
import { authMiddleware } from '../middleware/authMiddleware';
import { listItemCompleteSchema } from '../schemas/listItemCompleteSchema';

const listItemsRouter = Router()
// Get list items for a list_id
listItemsRouter.get('/:list_id', getListsItemsByList);
// Mark list item as complete
listItemsRouter.post('/:list_item_id', authMiddleware, validateData(listItemCompleteSchema), toggleListItemComplete);
// Add new new to-do list item
listItemsRouter.post('/new/:list_id', authMiddleware, validateData(listItemSchema), addListItemToList);
// Delete a to-do list item
listItemsRouter.delete('/delete/:list_item_id', authMiddleware, deleteListItem)

export default listItemsRouter