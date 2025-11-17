import React from 'react'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  

    const navigate = useNavigate();
    useEffect(() => {
     const doVerifyDashboardToken = async()=>{
        try {
            const res= await fetch("https://fitgenie-backend-7sko.onrender.com/api/auth/verifyDashboardToken",{
                method:"POST",
                body:JSON.stringify(),
                headers:{
                    "content-type":"application/json",
                    "authorization":`Bearer ${localStorage.getItem("jwt_token")}`
                }

            })
            const result = await res.json()

            if(!result.success){
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
     }
     doVerifyDashboardToken()
    }, [])
    
  return <Outlet/>
    
  
}

export default ProtectedRoute