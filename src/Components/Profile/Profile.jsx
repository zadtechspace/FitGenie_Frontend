import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'



const Profile = () => {

  const [userInfo, setUserInfo] = useState([])
  const _id = useParams()


  
  const token = localStorage.getItem("jwt_token")
  useEffect(() => {
    const displayUserInfo= async()=>{

      try {
        const res = await fetch(`http://localhost:4003/api/user/viewprofile/${_id}`,{
          method:"GET",
          body:JSON.stringify(),
          headers:{
            'content-type': 'application/json',
            "authorization": `Bearer ${token}`
          }

        })

        const result = await res.json()

        if(!result.success){
          console.log("User not found")
        }

        else{
          setUserInfo(result.user)
          toast.success("User information fetched successfully")
        }
      } catch (error) {
        console.log(error)
      }
    }
  displayUserInfo()
  }, [])
  

 



  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:gap-8">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-white/30 object-cover"
            />
            <div className="mt-4 md:mt-0">
              <h1 className="text-4xl font-bold">{userInfo.firstName} {userInfo.lastName}</h1>
              <p className="text-lg text-white/90 mt-1">{userInfo.email}</p>
              <p className="text-sm text-white/80 mt-2">Member since January 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Fitness Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600">Total Workouts</p>
                  <p className="text-3xl font-bold text-sky-600">42</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Current Streak</p>
                  <p className="text-3xl font-bold text-indigo-600">7 days</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Hours</p>
                  <p className="text-3xl font-bold text-emerald-600">156h</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/goals"
                  className="block w-full text-center py-2 px-4 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
                >
                  View Goals
                </Link>
                <Link
                  to="/preferences"
                  className="block w-full text-center py-2 px-4 bg-slate-200 text-slate-900 rounded hover:bg-slate-300 transition"
                >
                  Settings
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700">First Name</label>
                  <p className="text-slate-900 mt-1">{userInfo.firstName}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Last Name</label>
                  <p className="text-slate-900 mt-1">{userInfo.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <p className="text-slate-900 mt-1">{userInfo.email}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Phone</label>
                  <p className="text-slate-900 mt-1">+1 (555) 123-4567</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Age</label>
                  <p className="text-slate-900 mt-1">{userInfo.age}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Location</label>
                  <p className="text-slate-900 mt-1">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Fitness Profile */}
            {/* <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Fitness Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Height</label>
                  <p className="text-slate-900 mt-1">{userInfo.height}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Weight</label>
                  <p className="text-slate-900 mt-1">{userInfo.weight}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Goal Weight</label>
                  <p className="text-slate-900 mt-1">{userInfo.}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Fitness Level</label>
                  <p className="text-slate-900 mt-1">Intermediate</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Preferred Activity</label>
                  <p className="text-slate-900 mt-1">Strength Training</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Weekly Goal (hrs)</label>
                  <p className="text-slate-900 mt-1">5 hours</p>
                </div>
              </div>
            </div> */}

            {/* Fitness Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Fitness Details</h2>
                <Link
                  to="/private/edit-profile"
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-semibold text-sm"
                >
                  Edit Profile
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Age:</label>
                  <p className="text-slate-900 mt-1">{userInfo.age}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Gender:</label>
                  <p className="text-slate-900 mt-1">{userInfo.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Height:</label>
                  <p className="text-slate-900 mt-1">{userInfo.height} cm</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Weight:</label>
                  <p className="text-slate-900 mt-1">{userInfo.weight} kg</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Fitness Goal:</label>
                  <p className="text-slate-900 mt-1">{userInfo.goal}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Diet Preference:</label>
                  <p className="text-slate-900 mt-1">{userInfo.dietPreference}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Time Per Day:</label>
                  <p className="text-slate-900 mt-1">{userInfo.timePerDay}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            {/* <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-sky-600 pl-4 py-2">
                  <p className="font-semibold text-slate-900">Chest & Triceps Workout</p>
                  <p className="text-sm text-slate-600">November 18, 2025 - 1 hour</p>
                </div>
                <div className="border-l-4 border-emerald-600 pl-4 py-2">
                  <p className="font-semibold text-slate-900">Morning Run</p>
                  <p className="text-sm text-slate-600">November 17, 2025 - 45 minutes</p>
                </div>
                <div className="border-l-4 border-indigo-600 pl-4 py-2">
                  <p className="font-semibold text-slate-900">Leg Day Workout</p>
                  <p className="text-sm text-slate-600">November 16, 2025 - 1.5 hours</p>
                </div>
                <div className="border-l-4 border-amber-600 pl-4 py-2">
                  <p className="font-semibold text-slate-900">Yoga Session</p>
                  <p className="text-sm text-slate-600">November 15, 2025 - 1 hour</p>
                </div>
              </div>
            </div> */}

            {/* Achievements */}
            {/* <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Achievements</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['🏆', '💪', '🔥', '⭐'].map((emoji, idx) => (
                  <div key={idx} className="text-center py-4 bg-slate-50 rounded-lg">
                    <p className="text-3xl">{emoji}</p>
                    <p className="text-xs text-slate-600 mt-2">
                      {['Milestone', 'Strong', 'Streak', 'Elite'][idx]}
                    </p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile