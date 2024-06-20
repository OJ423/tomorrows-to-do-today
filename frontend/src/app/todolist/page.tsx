"use client"

import AddToDoForm from "@/components/AddToDoForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ToDoCard from "@/components/ToDoCard";
import { useAuth } from "@/components/context/AuthContext";
import { getListById } from "@/utils/apiCalls";
import { List, ToDoItems } from "@/utils/custom-types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ToDoList() {
  const [listInfo, setListInfo] = useState<List | null>(null);
  const [listChange, setListChange] = useState<boolean>(false);
  const [toDoItems, setToDoItems ] = useState<ToDoItems[] | null>(null);
  const [addNewForm, setAddNewForm ] = useState<boolean>(false);
  const { user, token } = useAuth();
  const searchParams = useSearchParams();
  const selectedList:string | null = searchParams.get('list');

  function handleFormAppear() {
    setAddNewForm(!addNewForm)
  }

  useEffect(() => {
    if (selectedList) {
      const fetchData = async () => {
        try {
          const list_id = +selectedList
          const data = await getListById(list_id)
          setListInfo(data.list)
          setToDoItems(data.listItems)
        }  
        catch(error:any) {
          console.log(error.message)
        }
      }
      fetchData()
    }
  },[listChange])

  return(
    <section className="flex min-h-screen flex-col items-center justify-between w-screen">
      <Header />
      <main className="md:w-3/5 px-8">
      {user ?
        <>
        {listInfo ?
        <section className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl mb-6 sm:text-5xl">{listInfo.list_name}</h1>
          
          <div className="flex items-center gap-8 justify-between flex-wrap pb-8 mb-8 border-b-4">
            <div className="flex gap-8 items-center flex-wrap">
              <span className="bg-[#1DBF6C] block p-2 rounded font-bold">{listInfo.list_cat}</span>
              <p>{listInfo.list_desc}</p>
            </div>
            <button onClick={handleFormAppear} className="cursor-pointer inline-flex items-center rounded-full px-4 py-2 font-semibold text-[#1DBF6C] hover:text-white border-2 border-[#1DBF6C] hover:bg-[#1DBF6C] transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-[#1DBF6C] duration-300">
              Add new
            </button>
          </div>
          <section className={`${addNewForm ? "block" : "hidden"}`}>
            <AddToDoForm list_id={selectedList} setListChange={setListChange} listChange={listChange} setAddNewForm={setAddNewForm} addNewForm={addNewForm}/>
          </section>
          { toDoItems ? 
          <section className="flex flex-col gap-4">
          {toDoItems.map((item: any) => (
           <ToDoCard key={item.list_item_id} toDo={item} setListChange={setListChange} listChange={listChange}  />
          ))}
          </section>
          :
          <p>ded</p>
          }
        </section>
        :
          <p>You have no to-do items.</p>
        }
        </>
        :
        <>
          <p className="font-medium text-xl">Login or register to create and manage your to-do lists.</p>
          <Link href='/login'>
            <button className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-[#1DBF6C] hover:text-white border-2 border-[#1DBF6C] hover:bg-[#1DBF6C] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-[#1DBF6C] duration-300">
              Login/Register
            </button>
          </Link>
        </>
        }
      </main>
      <Footer />
    </section>
      
  )
}