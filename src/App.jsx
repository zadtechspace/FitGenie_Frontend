import React from 'react'
import  {Routes, Route } from "react-router-dom"
import Public from './Layouts/Public'
import Private from './Layouts/Private'
import ProtectedRoute from './Components/ProtectedRoute'
import { Toaster } from 'sonner'


const App = () => {
  return (
    <div>
  
      <Toaster richColors position="top-right" closeButton visibleToasts={3}/>
      <Routes>
        <Route path="/*" element={<Public />} />

        <Route element={<ProtectedRoute/>}>
        <Route path="/private/*" element={<Private />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App