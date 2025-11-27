import React from 'react'
import { Routes, Route } from "react-router-dom"
import Public from './Layouts/Public'
import Private from './Layouts/Private'
import ProtectedRoute from './Components/ProtectedRoute'
import { Toaster } from 'sonner'


const App = () => {
  return (
    <div>

      <Toaster richColors position="top-right" closeButton visibleToasts={3} />
      <Routes>
        <Route path="/*" element={<Public />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/private/*" element={<Private />} />
        </Route>
      </Routes>
      <div>
        <vapi-widget style={{
          // maxHeight: "80vh",
          // background: "red",
          // padding: "1rem",
          // top: '5rem'
        }} assistant-id="71a2e488-d51d-48ef-bade-0d4871cdcecc" public-key="51a8dbdd-bc75-483e-a9c1-2e8c025af97f"></vapi-widget>
        <script
          style={{
            // maxHeight: "80vh",
            // background: "red",
            // padding: "1rem",
            // top: '5rem'
          }}
          src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
          async
          type="text/javascript"
        ></script>
      </div>
    </div>
  )
}

export default App