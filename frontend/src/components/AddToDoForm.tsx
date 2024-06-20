import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from "./context/AuthContext";
import { NewToDoInput } from "@/utils/custom-types";
import { createNewToDo } from "@/utils/apiCalls";

interface FormProps {
  list_id: string|null,
  setListChange: React.Dispatch<React.SetStateAction<boolean>>,
  listChange: boolean,
  setAddNewForm: React.Dispatch<React.SetStateAction<boolean>>,
  addNewForm: boolean
}

const AddToDoForm: React.FC<FormProps> = ({list_id, setListChange, listChange, setAddNewForm, addNewForm}) => {
  const { token } = useAuth();
  const [ listErr, setListErr ] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewToDoInput>()
  
  const onSubmit: SubmitHandler<NewToDoInput> = async (data) => {
    try {
      const body = {list_item_desc: data.list_item_desc, list_id}
      if(list_id) {
        const listData = await createNewToDo(body, list_id, token);
        setListChange(!listChange)
        reset()
        setAddNewForm(!addNewForm)
      }
    }
    catch(error:any) {
      if(error.response.data.msg === "Invalid or expired token") {
        setListErr("Your authentication token has expired. Please log out and log back in to add to this list.")
      }
      setListErr('Something went wrong. Please try again.')
      console.log(error.message)
    }
  }



  return (
    <>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
     
      <textarea className="p-4 mb-4 rounded" placeholder="Your to-do item" {...register("list_item_desc", { required: "To-do is required", minLength: 3 })} />
      {errors.list_item_desc && <span className="mb-4 text-rose-600 text-xs font-bold">To-do needs to be 3 characters or more</span>}
     
      <input className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-[#1DBF6C] hover:text-white border-2 border-[#1DBF6C] hover:bg-[#1DBF6C] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-[#1DBF6C] duration-300" type="submit" />
    </form>
    {listErr ? <p className='font-bold mt-8 text-rose-600 text-center'>{listErr}</p>:null}
    </>
  )
}

export default AddToDoForm