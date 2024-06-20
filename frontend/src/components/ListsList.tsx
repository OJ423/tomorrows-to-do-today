import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { List } from "@/utils/custom-types";
import { getUserLists } from "@/utils/apiCalls";
import ListCard from "./ListCard";
import Link from "next/link";

export function ListsList() {
  const {user, token} = useAuth()
  const [userLists, setUserLists] = useState<List[] | []>([])
  const [listChange, setListChange] = useState<boolean>(false)

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const user_id = +user?.user_id
          const data = await getUserLists(user_id)
          setUserLists(data.lists)
        }  
        catch(error:any) {
          console.log(error.message)
        }
      }
      fetchData()
    }
  },[listChange])

  return(
    <section className="flex flex-col gap-8">
        {userLists.length ? 
        <>
        <p className="text-lg mb-4">Here are your to-do lists...</p>
        {userLists.map((list: any) => (
          <section key={list.list_id} className="p-8 border-2 rounded-lg">
            <ListCard list={list} listChange={listChange} setListChange={setListChange} />

          </section>
        ))}
        </>
      : 
      <section className="w-screen md:w-full flex flex-col gap-8">
        <p className="text-lg mb-4">Create your first list...</p>
        <Link href="/add-list">
          <button className="cursor-pointer inline items-center rounded-full px-9 py-3 text-xl font-semibold text-[#1DBF6C] hover:text-white border-2 border-[#1DBF6C] hover:bg-[#1DBF6C] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-[#1DBF6C] duration-300">
            Create List
          </button>
        </Link>
      </section>
      }
    </section>
  )
}