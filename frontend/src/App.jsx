import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NewRoadmap from './pages/NewRoadmap'
import MyRoadmaps from './pages/MyRoadmaps'
import Profile from './pages/Profile'
import Credits from './pages/Credits'
import Settings from './pages/Settings'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/roadmaps/new' element={<NewRoadmap />} />
        <Route path='/roadmaps' element={<MyRoadmaps />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/credits' element={<Credits />} />
        <Route path='/settings' element={<Settings />} />

      </Routes>
    </div>
  )
}
