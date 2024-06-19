import { Request, Response } from "express";
import { createList, fetchListById, fetchListsByUser, removeList } from "../models/list-models";
import { fetchListItemsByList } from "../models/list-items.models";

export async function addList(req: Request, res: Response) {
  try {
    const {list_name, list_desc, list_cat} = req.body;
    const {user_id} = req.params;
    const numId:number = +user_id
    const newList = await createList(list_name, list_desc, list_cat, numId);
    res.status(201).send({list:newList})
  }
  catch(error:any) {
    console.log(error.message)
    res.status(500).send({
      message: "Internal Server Error",
    })
  }
}

export async function getListsByUser(req: Request, res: Response) {
  try {
    const user_id = +req.params.user_id;
    const lists = await fetchListsByUser(user_id);
    res.status(200).send({lists})
  }
  catch(error:any) {
    res.status(400).send({message: 'Something went wrong.'})
  }
}

export async function getListById(req: Request, res: Response) {
  try {
    const list_id = +req.params.list_id;
    const list = await fetchListById(list_id);
    const listItems = await fetchListItemsByList(list_id)
    res.status(200).send({list, listItems})
  }
  catch(error:any) {
    res.status(400).send({message: 'Something went wrong.'})
  }
}

export async function deleteList(req:Request, res: Response) {
  try {
    const list_id = +req.params.list_id;
    const deleteList = await removeList(list_id);
    res.status(200).send({message: `List '${deleteList.list_name}' successfully deleted.`})
  }
  catch (error:any) {
    res.status(error.status).send({message: error.message})
  }
}