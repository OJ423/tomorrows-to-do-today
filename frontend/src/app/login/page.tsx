"use client"

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"

import { useAuth } from "@/components/context/AuthContext";
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { LogInInputs } from "@/utils/custom-types";
import { logUserIn } from "@/utils/apiCalls";
import { useState } from 'react';


export default function Lists() {
  const { user, setToken, setUser } = useAuth();
  const [ loginErr, setLoginErr ] = useState<string | null>(null) 
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LogInInputs>()
  
  const onSubmit: SubmitHandler<LogInInputs> = async (data) => {
    try {
      const userData = await logUserIn(data);
      setUser(userData.user);
      setToken(userData.token);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData.user));
      router.push('/')
    }
    catch(error:any) {
      if(error.message ==='Request failed with status code 404') {
        setLoginErr('Email or password do not match')
      }
      console.log(error.message)
    }
  }

  
  const handleLogout = ():void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null)
  }

  return(
  <main className="flex min-h-screen flex-col items-center justify-between w-screen">
    <Header />
    {user ?
      <button onClick={handleLogout} className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-[#1DBF6C] hover:text-white border-2 border-[#1DBF6C] hover:bg-[#1DBF6C] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-[#1DBF6C] duration-300  focus:bg-transparent">
        Logout
      </button>
    :
    <section className="px-8">
      <h1 className="font-bold text-3xl mb-8">Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <input className="p-4 mb-4 rounded" placeholder="Email Address" {...register("email", { required: "Email is required" })} />
      {errors.email && <span>Email is required</span>}

      <input className="p-4 mb-8 rounded" placeholder="Password" {...register("password", { required: "Password required" })} />
      {errors.password && <span>Password is required</span>}

      <input className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-[#1DBF6C] hover:text-white border-2 border-[#1DBF6C] hover:bg-[#1DBF6C] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-[#1DBF6C] duration-300" type="submit" />
    </form>
    {loginErr ? <p className='font-bold mt-8 text-rose-600 text-center'>{loginErr}</p>:null}
    </section>
    }
    <Footer />
  </main>)
}