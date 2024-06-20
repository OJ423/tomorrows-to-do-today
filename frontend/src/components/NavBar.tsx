"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "./context/AuthContext";

interface UserLoggedIn {
  username: string,
  user_id: number
}


export default function NavBar() {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const { user, setToken, setUser } = useAuth();
  const [userLogIn, setUserLogIn] = useState<UserLoggedIn | null>(null);


  function handleMenuOpen():void {
    setNavOpen(!navOpen) 
  }

  function handleLogOut():void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null)
  }
  
  return(
    <nav className="pt-8 pe-8">
      {user ? 
      <>
      <section className='flex flex-row justify-between px-4 xl:p-0 start-0 items-center w-[100%] max-w-screen-xl mx-auto'>
          <button onClick={handleMenuOpen}>
            <svg className={`${navOpen? 'mt-[-10px] h-8':'h-8'}`}  fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" className={`${navOpen ? 'rotate-45 origin-left transition-all duration-500':'transition-all duration-500'}`} strokeLinejoin="round" d="M3.75 6.75h16.5" />
              <path strokeLinecap="round" className={`${navOpen ? '-rotate-45 origin-right transition-all duration-500':'transition-all duration-500'}`} strokeLinejoin="round" d="M3.75 6.75h16.5" />
              <path strokeLinecap="round" className={`${navOpen ? 'opacity-0 transition-all duration-500':'transition-all duration-500 opacity-100'}`}strokeLinejoin="round" d="M3.75 12h16.5" />
              <path strokeLinecap="round" className={`${navOpen ? 'opacity-0 transition-all duration-500':'opactiy-100 transition-all duration-500'}`} strokeLinejoin="round" d="M3.75 17.25h16.5" />
            </svg>
          </button>
        <div onClick={handleMenuOpen} className={`${!navOpen ? 'invisible opacity-0': 'opacity-50'} w-full h-full top-0 left-0 bg-gray-300 fixed duration-500 ease-out transition-all cursor-pointer z-20`}>
        </div>
        <section className={`${!navOpen ? 'translate-x-[-100%]': 'translate-x-0'} w-[60vw] sm:w-[30vw] h-full bg-white left-0 top-0 opacity-100 fixed duration-500 ease-out transition-all p-8 flex flex-col gap-12 justify-center text-center items-center z-40 shadow-lg items-center`}>
          <ul className="text-left">
            <Link href="/">
              <li onClick={handleMenuOpen} className="list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all">
                Home
              </li>
            </Link>
            <Link href="/lists">
              <li onClick={handleMenuOpen} className="list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all">
                Your To-Do Lists
              </li>
            </Link>
            <Link href="/add-list">
              <li onClick={handleMenuOpen} className="list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all">
                Add New List
              </li>
            </Link>
            <li onClick={handleLogOut} className="list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all">
                Logout
            </li>
          </ul>
        </section>

        <div onClick={handleMenuOpen} className={`${!navOpen ? 'invisible opacity-0': 'opacity-100'} fixed cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center left-0 mt-5 ml-5 z-50 transition-all duration-1000`}>
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
        </section>
        </>
        :
      <Link href="/login">
        <p className="list-style-none font-bold text-lg flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all">
          Login/Register
        </p>
      </Link>
      }
        

    </nav>
  )
}