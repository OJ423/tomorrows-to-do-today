"use client"

import AddListForm from "@/components/AddListForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/components/context/AuthContext";
import Link from "next/link";

export default function AddList() {
  const { user, token } = useAuth()
  return(
    <section className="flex min-h-screen flex-col items-center justify-between w-screen">
      <Header />
      <main className="md:w-3/5 px-8">
      {user ?
        <>
          <h1 className="font-bold text-3xl mb-8 sm:text-5xl">Add a new list, <span className="text-[#1DBF6C]">{user?.username}</span></h1>
          <AddListForm />
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