import { Request, Response } from "express";
import { createListItem, fetchListItemsByList, removeListItem, updateListItemCompleteStatus } from "../models/list-items.models";

export async function addListItemToList (req: Request, res: Response) {
  try {
    const {list_item_desc} = req.body;
    const list_id = +req.params.list_id;
    const newListItem = await createListItem(list_item_desc, list_id)
    res.status(201).send({listItem: newListItem})
  }
  catch(error:any) {
    res.status(error.status).send({message: error.message})  }
}

export async function getListsItemsByList(req: Request, res: Response) {
  try {
    const list_id = +req.params.list_id;
    const toDoLists = await fetchListItemsByList(list_id);
    res.status(200).send({listItems: toDoLists})
  }
  catch(error:any) {
    res.status(error.status).send({message: error.message})  }
}

export async function toggleListItemComplete(req:Request, res:Response) {
  try {
    const list_item_id = +req.params.list_item_id;
    const {completed} = req.body
    const listItem = await updateListItemCompleteStatus(list_item_id, completed)
    res.status(200).send({listItem})
  }
  catch (error:any) {
    res.status(error.status).send({message: error.message})
  }
}

export async function deleteListItem(req:Request, res: Response) {
  try {
    const list_item_id = +req.params.list_item_id;
    const deleteListItem = await removeListItem(list_item_id);
    res.status(200).send({message: `List item '${deleteListItem.list_item_desc}' successfully deleted.`})
  }
  catch (error:any) {
    console.log(error.message)
    res.status(error.status).send({message: error.message})
  }
}