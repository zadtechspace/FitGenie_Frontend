import React from 'react'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  

    const navigate = useNavigate();
    useEffect(() => {
     const doVerifyDashboardToken = async()=>{
        try {
            const res= await fetch("http://localhost:4003/api/auth/verifyDashboardToken",{
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