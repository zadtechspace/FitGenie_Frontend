import React from 'react'
import PrivateNavbar from '../Components/Navbars/PrivateNavbar'
import { Route, Routes } from 'react-router-dom'
import Profile from '../Components/Profile/Profile'
import EditProfile from '../Components/Profile/EditProfile'

const Private = () => {
  return (
    <div>
      <PrivateNavbar/>

      <Routes>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/edit-profile" element={<EditProfile/>}/>
      </Routes>
    </div>
  )
}

export default Private