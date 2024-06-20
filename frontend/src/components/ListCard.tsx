import { deleteListById } from "@/utils/apiCalls"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "./context/AuthContext"
import { List } from "@/utils/custom-types"

interface ListProps {
  list: List
}

const ListCard: React.FC<ListProps> = ({list}) => {
  const [deleteCheck, setDeleteCheck] = useState<boolean>(false)
  const [optimisticDelete, setOptimisticDelete] = useState<boolean>(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const { token } = useAuth()

  function deleteDoubleCheck() {
    setDeleteCheck(!deleteCheck)
  }

  async function handleDeleteList() {
    try {
      const list_id = +list.list_id
      const deleteList = await deleteListById(list_id, token) 
      setOptimisticDelete(true)
    } catch(error:any) {
      if(error.response.data.msg === "Invalid or expired token") {
        setDeleteError("Your authentication token has expired. Please log out and log back in to proceed with this delete action.")
      }
      console.log(error.response.data.msg)
    }
      
  }

  return (
    <>
    <div className={`${optimisticDelete ? "hidden" : "block" }`}>
      <h2 className="text-2xl font-bold mb-4">{list.list_name}</h2>
      <p className="text-gray-600 mb-4">{list.list_desc}</p>
      <div className="flex flex-wrap gap-4 justify-between items-center mt-8">
        <span className="bg-[#1DBF6C] p-2 rounded font-bold">{list.list_cat}</span>
        <div className="flex gap-4 flex-wrap">
          <Link href={{
            pathname:'/todolist',
            query:{list: `${list.list_id}`}
          }}>
            <button className="cursor-pointer inline-flex items-center rounded-full px-4 py-2 font-semibold text-[#1DBF6C] hover:text-white border-2 border-[#1DBF6C] hover:bg-[#1DBF6C] transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-[#1DBF6C] duration-300">
              View/Do
            </button>
          </Link>
          {deleteCheck ?
          <>
            <button onClick={handleDeleteList} className="cursor-pointer inline-flex items-center rounded-full px-4 py-2 font-semibold text-black hover:text-white border-2 border-black hover:bg-black transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-black duration-300">
            Confirm
            </button>
            <button onClick={deleteDoubleCheck} className="cursor-pointer inline-flex items-center rounded-full px-4 py-2 font-semibold text-gray-400 hover:text-white border-2 border-gray-400 hover:bg-gray-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-gray-400 duration-300">
            Cancel
            </button>
          </>
          :              
          <button onClick={deleteDoubleCheck} className="cursor-pointer inline-flex items-center rounded-full px-4 py-2 font-semibold text-rose-600 hover:text-white border-2 border-rose-600 hover:bg-rose-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-rose-600 duration-300">
            Delete
          </button>
          }
        </div>
        {deleteError ? <p className='font-bold mt-8 text-rose-600 text-center'>{deleteError}</p>:null}
      </div>
    </div>
    </>
  )
}

export default ListCard