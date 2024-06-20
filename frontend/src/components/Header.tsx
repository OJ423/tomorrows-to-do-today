"use client"

import { useState } from "react";
import NavBar from "./NavBar";
import Image from "next/image";
import tomorrowsToDoTodayLogo from "../../public/TomorrowsToDoTodayLogo.svg"
import Link from "next/link";


export default function() {

  return(
  <header className="w-screen flex items-center justify-between mb-8">
    <Link href='/'>
      <Image 
        src={tomorrowsToDoTodayLogo}
        alt="Tomorrow's ToDo Today Logo"
        className="pt-8 pl-8 w-40 sm:w-72 h-auto"
        priority
      />
    </Link>
    <NavBar />
  </header>
  )
}