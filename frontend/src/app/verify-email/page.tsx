"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { validateUser } from "@/utils/apiCalls";
import { useAuth } from "@/components/context/AuthContext";

export default function VerifyEmail() {
  const { setToken, setUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  useEffect(() => {
    if(token) {
      const fetchData = async () => {
        try {
          const userData = await validateUser(token)
          setUser(userData.user);
          setToken(userData.token);
          localStorage.setItem('token', userData.token);
          localStorage.setItem('user', JSON.stringify(userData.user));
          router.push('/')
        }  
        catch(error:any) {
          console.log(error.message)
        }
      }
      fetchData()
    }
  },[])
  
  return(
    <main className="flex min-h-screen flex-col items-center justify-between w-screen">
    <Header />
    {!token ?
      <section className="max-w-screen-md">
        <h1 className="font-bold text-5xl mb-8 sm:text-7xl">Remember to <span className="text-[#1DBF6C]">Validate</span></h1>
        <p className="text-lg mb-4">Check your email. Click on the link. Boom. You&apos;re in.</p>
      </section>
    :
      <p className="max-w-screen-md font-bold text-xl">Validating you. <br></br>Wait one second (ish) while we talk to the database.</p>
    }
    <Footer />
    </main>
     
  )
}