import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { List } from "@/utils/custom-types";
import { getUserLists } from "@/utils/apiCalls";
import ListCard from "./ListCard";

export function ListsList() {
  const {user, token} = useAuth()
  const [userLists, setUserLists] = useState<List[] | null | []>(null)

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const user_id = +user?.user_id
          const data = await getUserLists(user_id)
          console.log(data.lists)
          setUserLists(data.lists)
        }  
        catch(error:any) {
          console.log(error.message)
        }
      }
      fetchData()
    }
  },[])

  return(
    <section className="w-screen md:w-3/5 flex flex-col gap-8 px-4">
        {userLists ? 
        userLists.map((list: any) => (
          <section key={list.list_id} className="p-8 border-2 rounded-lg">
            <ListCard list={list}/>

          </section>
        ))
      :
      null
      }
    </section>
  )
}