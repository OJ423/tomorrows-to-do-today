"use client"

import { ToDoCompleted, ToDoItems } from "@/utils/custom-types";
import { useState } from "react";
import { IoCheckmarkCircleOutline, IoTrashOutline, IoCloseCircleOutline } from "react-icons/io5";
import { useAuth } from "./context/AuthContext";
import { deleteListItemById, toggleTaskComplete } from "@/utils/apiCalls";

interface ItemProps {
  toDo: ToDoItems,
  setListChange: React.Dispatch<React.SetStateAction<boolean>>,
  listChange: boolean
}

const ToDoCard: React.FC<ItemProps>  = ({ toDo, setListChange, listChange }) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [err, setErr] = useState<string|null>(null)
  const { token } = useAuth()

  const year = `${toDo.list_item_date.slice(0,4)}`
  const month = `${toDo.list_item_date.slice(5,7)}`
  const day = ` ${toDo.list_item_date.slice(8,10)}`

  async function handleCompleted() {
    try{
      await setCompleted(!completed);
      let completedStatus:ToDoCompleted;
      if (completed) completedStatus = {completed: false};
      else { completedStatus = {completed: true}};
      await toggleTaskComplete(toDo.list_item_id, completedStatus, token);
      setListChange(!listChange);
    } catch(error:any) {
      console.log(error.response.data.msg)
      if(error.response.data.msg === "Invalid or expired token") {
        setErr("Your authentication token has expired. Please log out and log back in to add this list.")
      } else {
        setErr('Something went wrong. Please try again.')
      }
    }

  } 

  async function handleDelete() {
    try {
      const list_item_id = +toDo.list_item_id
      const deleteList = await deleteListItemById(list_item_id, token) 
      setListChange(!listChange)
    } catch(error:any) {
      if(error.response.data.msg === "Invalid or expired token") {
        setErr("Your authentication token has expired. Please log out and log back in to proceed with this delete action.")
      }
      console.log(error.response.data.msg)
    }
  } 
    
  return(
    <>
    {err ? <p className="font-bold text-rose-600">{err}</p>: null}
    <section className={`${toDo.completed ? "bg-green-100" : null } flex flex-wrap gap-4 p-4 border-4 rounded-xl items-center justify-between`}>
      <div className="flex sm:flex-col p-2 bg-gray-200 border-4 border-gray-600 rounded-xl">
        <p className="font-medium">{year}</p>
        <p className="font-medium">{day} {month}</p>
      </div>
      <p className="font-bold text-xl">{toDo.list_item_desc}</p>
      <div className="flex sm:flex-col gap-4">
        <div onClick={handleCompleted} className="cursor-pointer p-4 bg-green-100 rounded hover:bg-green-200 transition duration-500">
          {toDo.completed ? 
          <IoCloseCircleOutline size={25} aria-label="Mark task as incomplete" />
          :
          <IoCheckmarkCircleOutline size={25} aria-label="Mark task as complete" />
        }
        </div>
        <div onClick={handleDelete} className="cursor-pointer p-4 bg-red-100 rounded hover:bg-red-200 transition duration-500">
          <IoTrashOutline size={25} aria-label="delete task" />
        </div>
      </div>
    </section>
        </>)
}

export default ToDoCard