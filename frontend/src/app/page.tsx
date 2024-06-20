"use client"

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ListsList } from "@/components/ListsList";
import { useAuth } from "@/components/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const {token, user} = useAuth()
  return (
    <section className="flex min-h-screen flex-col items-center justify-between w-screen">
     <Header />
     <main className="md:w-3/5 px-8">
      {!user ? 
      <section>
        <h1 className="font-bold text-5xl mb-8 sm:text-7xl">Tomorrow&apos;s<br></br>To-Do <br></br><span className="text-[#1DBF6C]">Today</span></h1>
        <p className="text-lg mb-4">Procrastinate no more.</p>
        <p className="text-lg mb-4">Login or register to begin ticking off your goals.</p>
        <div className="flex items-center justify-start gap-8 mt-8">
          <Link href='/login'>
            <button className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-[#1DBF6C] hover:text-white border-2 border-[#1DBF6C] hover:bg-[#1DBF6C] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-[#1DBF6C] duration-300">
            Login/Register
            </button>
          </Link>
        </div>
      </section>
      : user.validated ?
      <>
      <section className="w-full">
        <h1 className="font-bold text-5xl mb-8 sm:text-7xl">Hey <span className="text-[#1DBF6C]">{user.username}</span></h1>
        <ListsList />
      </section>
        </>
        :
        <>
        <section className="max-w-screen-md">
          <h1 className="font-bold text-5xl mb-8 sm:text-7xl">Hey <span className="text-[#1DBF6C]">{user.username}</span></h1>
          <p className="text-lg mb-4">Remember to validate your account via the link in your email</p>
        </section>
        </>
      }
      </main>
      <Footer />
    </section>
  );
}
