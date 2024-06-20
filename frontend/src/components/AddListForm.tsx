import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from "./context/AuthContext";
import { List, NewListInput } from "@/utils/custom-types";
import { createNewList } from "@/utils/apiCalls";

export default function AddListForm() {
  const { user, token } = useAuth();
  const [ listErr, setListErr ] = useState<string | null>(null) 
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewListInput>()
  
  const onSubmit: SubmitHandler<NewListInput> = async (data) => {
    try {
      let user_id:number = 0;
      if(user) user_id = +user.user_id
      const listData = await createNewList(data, user_id, token);
      router.push(`/todolist?list=${listData.list.list_id}`)
    }
    catch(error:any) {
      if(error.response.data.msg === "Invalid or expired token") {
        setListErr("Your authentication token has expired. Please log out and log back in to add this list.")
      }
      setListErr('Something went wrong. Please try again.')
      console.log(error.message)
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <input className="p-4 mb-4 rounded" placeholder="To do list name" {...register("list_name", { required: "List name is required", minLength: 6 })} />
      {errors.list_name && <span className="mb-4 text-rose-600 text-xs font-bold">Username needs to be 6 characters or more</span>}
      <textarea className="p-4 mb-4 rounded" placeholder="List description" {...register("list_desc", { required: "List description is required", minLength:6 })} />
      {errors.list_desc && <span className="mb-4 text-rose-600 text-xs font-bold">List description needs to be 6 or more characters</span>}

      <input className="p-4 mb-8 rounded" placeholder="List category" {...register("list_cat", { required: "List category required", minLength:3 })} />
      {errors.list_cat && <span className="mb-4 text-rose-600 text-xs font-bold">List category needs to be at least 3 characters</span>}

      <input className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-[#1DBF6C] hover:text-white border-2 border-[#1DBF6C] hover:bg-[#1DBF6C] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-[#1DBF6C] duration-300" type="submit" />
    </form>
    {listErr ? <p className='font-bold mt-8 text-rose-600 text-center'>{listErr}</p>:null}
    </>
  )
}