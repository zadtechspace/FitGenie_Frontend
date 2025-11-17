import React from 'react'
import Navbar from '../Components/Navbars/PublicNavbar'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Components/Homepage'
import Signup from '../Components/Signup'
import Login from '../Components/Login'

const Public = () => {
  return (
      <div>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>


          </Routes>

      </div>
  )
}

export default Public