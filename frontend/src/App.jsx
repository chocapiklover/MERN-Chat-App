import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home.jsx';
import SignUp from './pages/signup/Signup'
import Login from './pages/login/Login.jsx';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';



function App() {
  const { authUser }= useAuthContext()
   
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path='/' element={ authUser ? <Home /> : <Navigate to={"/login"}/> } />
        <Route path='/login' element={ authUser ? <Navigate to='/' /> : <Login /> } />
        <Route path='/signup' element={ authUser ? <Navigate to='/' /> : <SignUp /> } /> {/*if user is authenticated, go to homepage*/}
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
