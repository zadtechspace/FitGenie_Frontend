import React from 'react'
import{useForm} from "react-hook-form"
import { toast } from 'sonner'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from'yup'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'






const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate  =useNavigate()
    const {token} = useParams()
    const loginSchema = yup.object().shape({
        email:yup.string().email("invalid email format").required("email is required"),
        password:yup.string().min(6,"password must be at least 6 characters").required("password is required"),
    })
    
    const {register,handleSubmit, reset, formState:{errors}} = useForm({
        resolver:yupResolver(loginSchema)
    })
    
    const handleLogin =async(data)=>{
        setIsLoading(true)
        try {
            const res = await fetch("http://localhost:4003/api/auth/login",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${token}`
                }
            })

            const result = await res.json()

            if(result.success){
                console.log("User logged in successfully")
                localStorage.setItem("jwt_token",result.token)
                console.log(result)
                reset()
                navigate("/private")
                toast.success("Login successful!")
            } else {
               
                toast.error("Email or Password is incorrect")
            }
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <div className="min-h-screen bg-gradient-to- from-indigo-700 to-sky-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/90 rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Welcome back</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">Sign in to continue to your FitGenie account.</p>

        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email address</label>
            <input id="email" name="email" type="email" required className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400" {...register("email")} />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input id="password" name="password" type="password" required className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400" {...register("password")} />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="remember" className="h-4 w-4 rounded border-slate-300" />
              <span className="text-slate-700 dark:text-slate-300">Remember me</span>
            </label>
            <a href="#" className="text-sky-600 hover:underline">Forgot password?</a>
          </div>

          <div>
            <button type="submit" className="w-full px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-medium">
                {isLoading ?"Logging in...":"Log In"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          New here? <Link to="/signup" className="ml-1 text-sky-600 font-medium">Create an account</Link>
        </div>
      </div>
    </div>
  )
}

export default Login