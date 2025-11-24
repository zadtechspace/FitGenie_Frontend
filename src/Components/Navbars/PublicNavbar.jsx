import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold text-white">FitGenie</Link>
        </div>

        <nav className="hidden md:flex md:items-center md:space-x-6">
          <Link to="/" className="text-white/90 hover:text-white">Home</Link>
          <Link to="/features" className="text-white/90 hover:text-white">Features</Link>
          <Link to="/plans" className="text-white/90 hover:text-white">Plans</Link>
          <Link to="/about" className="text-white/90 hover:text-white">About</Link>
          <Link to="/private" className="text-white/90 hover:text-white">dashboard</Link>
        </nav>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link to="/signup" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20">Sign Up</Link>
        </div>

       
        <button
          className="md:hidden p-2 rounded-md text-slate-800"
          aria-label="Toggle menu"
          onClick={() => setOpen(prev => !prev)}
        
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        
        </button>
      </div>

      {open && (
          <div className="md:hidden px-4 pb-4 bg-gradient from-sky-500 to-indigo-600 text-white">
          <nav className="flex flex-col space-y-2">
            <Link to="/" className="block py-2 text-white/90">Home</Link>
            <Link to="/features" className="block py-2 text-white/90">Features</Link>
            <Link to="/plans" className="block py-2 text-white/90">Plans</Link>
            <Link to="/about" className="block py-2 text-white/90">About</Link>
            <Link to="/signup" className="block mt-2 px-4 py-2 bg-white/20 text-white rounded-md text-center">Sign Up</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
