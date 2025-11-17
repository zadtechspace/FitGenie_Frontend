import React from 'react'

import { useState } from 'react'
import { Link } from 'react-router-dom'

const PrivateNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-2xl font-extrabold">💪 FitGenie</Link>
          <span className="hidden sm:block text-sm text-white/90">Your fitness dashboard</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:underline">Homepage</Link>
          <Link to="/dashboard/workouts" className="hover:underline">Workouts</Link>
          <Link to="/progress" className="hover:underline">Progress</Link>
          <Link to="/dashboard/nutrition" className="hover:underline">Nutrition</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden md:inline-flex relative p-2 rounded-full hover:bg-white/10" aria-label="Notifications">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>

          <Link to="/profile" className="hidden md:inline-flex items-center gap-2">
            <img src="https://via.placeholder.com/40" alt="Profile" className="h-9 w-9 rounded-full border-2 border-white/30" />
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded hover:bg-white/10"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(prev => !prev)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
          <nav className="flex flex-col space-y-2">
            <Link to="/" className="block py-2">Homepage</Link>
            <Link to="/dashboard/workouts" className="block py-2">Workouts</Link>
            <Link to="/dashboard/progress" className="block py-2">Progress</Link>
            <Link to="/dashboard/nutrition" className="block py-2">Nutrition</Link>
            <hr className="border-white/20 my-2" />
            <Link to="/dashboard/profile" className="block py-2">Profile</Link>
            <Link to="/logout" className="block py-2 text-red-300">Logout</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default PrivateNavbar

