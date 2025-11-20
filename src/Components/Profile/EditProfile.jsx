import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {yupResolver} from "@hookform/resolvers/yup"

import { useForm } from 'react-hook-form'

import * as yup from "yup"
import { toast } from 'sonner'


const EditProfile = () => {

  const [userInfo, setUserInfo] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const _id = useParams()
  
  const token = localStorage.getItem("jwt_token")
  // useEffect(() => {
  //   const displayUserInfo= async()=>{

  //     try {
  //       const res = await fetch(`http://localhost:4003/api/user/viewprofile/${_id}`,{
  //         method:"GET",
  //         body:JSON.stringify(),
  //         headers:{
  //           'content-type': 'application/json',
  //           "authorization": `Bearer ${token}`
  //         }

  //       })

  //       const result = await res.json()

  //       if(!result.success){
  //         console.log("User not found")
  //       }

  //       else{
  //         setUserInfo(result.user)
  //         toast.success("User information fetched successfully")
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // displayUserInfo()
  // }, [])


    const updateFitnessSchema = yup.object().shape({
      firstName: yup.string().required("first name is required"),
      lastName: yup.string().required("last name is required"),
      email: yup.string().required("email is required").email("Enter a valid email addresslas"),
      age: yup.string().required("age is required"),
      gender: yup.string().required("gender is required"),
      height: yup.number().required("height is required").positive(),
      weight: yup.number().required("weight is required").positive(),
      goal: yup.string().required("fitness goal is required"),
      dietPreference: yup.string().required("diet preference is required"),
      timePerDay: yup.number().required("time per day is required").positive(),
      
    })


    const {register, handleSubmit, formState:{errors},reset}=useForm({
      resolver:yupResolver(updateFitnessSchema),

    })


    const updateFitnessHandler =async (data)=>{
      setIsLoading(true)
        try {
            const res = await fetch("http://localhost:4003/api/user/updateprofile",{
            method:"PUT",
            body:JSON.stringify(data),
            headers:{
              "content-type":"application/json",
               "authorization": `Bearer ${token}`
            }
          })
          const result =await res.json()

          if(res.status===200){
            console.log(result.user)
          
            toast.success("Profile updated successfully")
            reset()
          }

          
        } catch (error) {
          console.log(error)
        }finally{
          setIsLoading(false)
        }
    }
    
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 md:p-10">
        <h1 className="text-4xl md:text-3xl font-bold text-slate-900 mb-8 text-center">Edit Profile</h1>

        <form className="space-y-8" onSubmit={handleSubmit(updateFitnessHandler)}>
          {/* Personal Information Section */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-6 uppercase tracking-wide border-b-2 border-sky-600 pb-3">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">First Name</label>
                <input
                  type="text"
                  {...register("firstName")}
                  // defaultValue={userInfo.firstName}
                  placeholder="Enter your first name"
                  className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition bg-slate-50 hover:bg-white"
                />
                {errors.firstName && <p className='text-red-600 text-sm mt-1 pl-1'>{errors.firstName.message}</p>}
              </div>


              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Last Name</label>
                <input
                  type="text"
                  {...register("lastName")}
                  // defaultValue={userInfo.lastName}
                  placeholder="Enter your last name"
                  className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition bg-slate-50 hover:bg-white"
                />
                {errors.lastName && <p className='text-red-600 text-sm mt-1 pl-1'>{errors.lastName.message}</p>}
              </div>
            </div>


            <div className="grid grid-cols-1  gap-6">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  // defaultValue={userInfo.email}
                  placeholder="Enter your email"
                  className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition bg-slate-50 hover:bg-white"
                />
                {errors.email && <p className='text-red-600 text-sm mt-1 pl-1'>{errors.email.message}</p>}
              </div>

              {/* <div className="flex flex-col">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  defaultValue={userInfo.password}
                  placeholder="Enter new password"
                  className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition bg-slate-50 hover:bg-white"
                />
              </div> */}
            </div>
          </div>

          {/* Physical Information Section */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-6 uppercase tracking-wide border-b-2 border-sky-600 pb-3">Physical Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="age" className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Age</label>
                <input
                  type="number"
                  {...register("age")}
                  placeholder="Enter your age"
                  className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition bg-slate-50 hover:bg-white"
                  min="13"
                  max="120"
                />

                {errors.age && <p className='text-red-600 text-sm mt-1 pl-1'>{errors.age.message}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="gender" className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Gender</label>
                <select id="gender" name="gender" className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition bg-slate-50 hover:bg-white cursor-pointer" {...register("gender")}>
                  <option value="">Select gender</option>
                  <option value="female" >Female</option>
                  <option value="male" >Male</option>
                
                </select>
              {errors.gender && <p className='text-red-600 text-sm mt-1 pl-1'>{errors.gender.message}</p>}
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label  className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Height (cm)</label>
                <input
                  type="number"
                  {...register("height")}
                  placeholder="Enter your height"
                  className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition bg-slate-50 hover:bg-white"
                  min="50"
                  max="300"
                />
                {errors.height && <p className='text-red-600 text-sm mt-1 pl-1'>{errors.height.message}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="weight" className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Weight (kg)</label>
                <input
                  type="number"
                  {...register("weight")}
                  placeholder="Enter your weight"
                  className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition bg-slate-50 hover:bg-white"
                  min="20"
                  max="500"
                  step="0.1"
                />
                {errors.weight && <p className='text-red-600 text-sm mt-1 pl-1'>{errors.weight.message}</p>}
              </div>
            </div>
          </div>

          {/* Fitness Goals Section */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-6 uppercase tracking-wide border-b-2 border-sky-600 pb-3">Fitness Goals</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="goal" className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Fitness Goal</label>
                <select id="goal"  className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition bg-slate-50 hover:bg-white cursor-pointer" {...register("goal")}>
                  <option value="">Select your fitness goal</option>
                  <option value="lose-weight">Lose Weight</option>
                  <option value="maintain-weight">Maintain Weight</option>
                  <option value="gain-weight">Gain Weight</option>
                </select>
                {errors.goal && <p className='text-red-600 text-sm mt-1 pl-1'>{errors.goal.message}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="dietPreference" className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Diet Preference</label>
                <select id="dietPreference" name="dietPreference" className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition bg-slate-50 hover:bg-white cursor-pointer"{...register("dietPreference")}>
                  <option value="">Select diet preference</option>
                  <option value="none">None</option>
                  <option value="balanced">Balanced</option>
                  <option value="high_protein">High_Protein</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten_free">Gluten_Free</option>
                </select>
                {errors.dietPreference && <p className='text-red-600 text-sm mt-1 pl-1'>{errors.dietPreference.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex flex-col">
                <label htmlFor="timePerDay" className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Time Available Per Day (minutes)</label>
                <input
                  type="number"
                  {...register("timePerDay")}
                  placeholder="Enter minutes per day"
                  className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition bg-slate-50 hover:bg-white"
                  min="15"
                  max="480"
                />
                {errors.timePerDay && <p className='text-red-600 text-sm mt-1 pl-1'>{errors.timePerDay.message}</p>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-slate-200">
            <button 
              // type="submit" 
              className="w-full py-3 bg-linear-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-blue-700 transition transform hover:scale-105 active:scale-95 shadow-lg uppercase tracking-wide"
            >
             {isLoading ? "Updating..." : "Update"}
            </button>

            <button 
            type='reset'
              className="w-full py-3 bg-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-300 transition border-2 border-slate-300 uppercase tracking-wide"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
