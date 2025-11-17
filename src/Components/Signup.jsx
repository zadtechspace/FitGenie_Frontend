import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import { useState } from 'react'

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const signupSchema = yup.object().shape({
        firstName:yup.string().required("first name is required"),
        lastName:yup.string().required("last name is required"),
        email:yup.string().email("invalid email format").required("email is required"),
        password:yup.string().min(6,"password must be at least 6 characters").required("password is required"),
    })


    const {register,handleSubmit,reset,formState:{errors}}=useForm({
        resolver:yupResolver(signupSchema)
    })

    const handleSignUp = async(data)=>{

        setIsLoading(true)
        try {
            const res = await fetch("http://localhost:4003/api/auth/register",{
                method:"POST",
                body:JSON.stringify(data),
               headers:{
                "Content-Type":"application/json"
               }
            })
            const result =await res.json()
            if(result.success){
                toast.success("Registration successful! Please login.")
                console.log(result.user)
                navigate("/login")
            } else {
                toast.error("Registration failed. Please try again.")
            }
        } catch (error) {
            console.log("An error occurred during registration",error)
            toast.error("An error occurred during registration. Please try again.")
            if(result.status==409){
                toast.error("Email already exists. Please use a different email.")
                return
            }
        }finally{
            setIsLoading(false)
        }
         reset()
        }




  return (
    <div className="min-h-screen bg-gradient-to- from-sky-600 to-indigo-700 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/90 rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Create your account</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">Join FitGenie to get personalized plans and track your progress.</p>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)} >
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
            <input id="firstName" name="firstName" type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400" {...register("firstName")} />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
            <input id="lastName" name="lastName" type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"  {...register("lastName")} />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email address</label>
            <input id="email" name="email" type="email" required className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"  {...register("email")}/>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

         
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input id="password" name="password" type="password" required className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"  {...register("password")}/>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            

          <div className="flex items-start gap-2 text-sm">
            <input id="terms" name="terms" type="checkbox" className="h-4 w-4 rounded border-slate-300" />
            <label htmlFor="terms" className="text-slate-700 dark:text-slate-300">I agree to the <a href="#" className="text-sky-600 hover:underline">terms and privacy</a>.</label>
          </div>

          <div>
            <button type="submit" className="w-full px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-medium">
                {isLoading ?"Signing up...":"Sign up"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?
          <Link to="/login" className="ml-2 inline-block px-3 py-1.5 border border-sky-600 text-sky-600 rounded-md font-medium">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup