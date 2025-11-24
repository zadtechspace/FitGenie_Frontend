import React from 'react'
import PrivateNavbar from '../Components/Navbars/PrivateNavbar'
import { Route, Routes } from 'react-router-dom'
import Profile from '../Components/Profile/Profile'
import EditProfile from '../Components/Profile/EditProfile'
import DashboardINdex from '../pages/DashboardINdex'
import Subscription from '../pages/Subscription'

const Private = () => {
  return (
    <div>
      <PrivateNavbar />

      <Routes>
        <Route path="/" element={<DashboardINdex />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </div>
  )
}

export default Private