import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { RegistrationInputs } from "@/utils/custom-types";
import { registerUser } from "@/utils/apiCalls";

export default function RegistrationForm() {
  const [ registrationErr, setRegistrationErr ] = useState<string | null>(null) 
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationInputs>()
  
  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    try {
      const userData = await registerUser(data);
      router.push('/verify-email')
    }
    catch(error:any) {
      setRegistrationErr('Something went wrong. Please try again.')
      console.log(error.message)
    }
  }


  return (
    <>
    <h1 className="font-bold text-3xl mb-8">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <input className="p-4 mb-4 rounded" placeholder="Username" {...register("username", { required: "Username is required", minLength: 4 })} />
      {errors.email && <span className="mb-4 text-rose-600 text-xs font-bold">Username needs to be 4 characters or more</span>}
      <input className="p-4 mb-4 rounded" placeholder="Email Address" {...register("email", { required: "Email is required", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} />
      {errors.email && <span className="mb-4 text-rose-600 text-xs font-bold">Email is required</span>}

      <input className="p-4 mb-8 rounded" placeholder="Password" {...register("password", { required: "Password required", minLength:8 })} />
      {errors.password && <span className="mb-4 text-rose-600 text-xs font-bold">Password needs to be 8 characters or more</span>}

      <input className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-[#1DBF6C] hover:text-white border-2 border-[#1DBF6C] hover:bg-[#1DBF6C] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-[#1DBF6C] duration-300" type="submit" />
    </form>
    {registrationErr ? <p className='font-bold mt-8 text-rose-600 text-center'>{registrationErr}</p>:null}
    </>
  )
}