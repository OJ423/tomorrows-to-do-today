"use client"

import { useAuth } from "@/components/context/AuthContext";
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import LoginForm from "@/components/LoginFrom";
import RegistrationForm from "@/components/RegistrationForm";
import { useState } from "react";


export default function Lists() {
  const { user, setUser, setToken } = useAuth();
  const [ newUser, setNewUser ] = useState<boolean>(false)
  
  const handleLogout = ():void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null)
  }

  function handleSignUpState() {
    setNewUser(!newUser)
  }

  return(
  <main className="flex min-h-screen flex-col items-center justify-between w-screen">
    <Header />
    {user ?
      <button onClick={handleLogout} className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-[#1DBF6C] hover:text-white border-2 border-[#1DBF6C] hover:bg-[#1DBF6C] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-[#1DBF6C] duration-300  focus:bg-transparent">
        Logout
      </button>
    :
    <section className="px-8 flex flex-col">
      {!newUser ? 
        <>
        <LoginForm />
        <button onClick={handleSignUpState} className="mt-8 text-xs font-medium hover:bg-gray-200 rounded-xl transition duration-500 p-4 border-b-4">Click here to register</button>
        </>
      :
        <>
        <RegistrationForm />
        <button onClick={handleSignUpState} className="mt-8 text-xs font-medium hover:bg-gray-200 rounded-xl transition duration-500 p-4 border-b-4">Click here to login</button>
        </>
      }

    </section>
    }
    <Footer />
  </main>)
}