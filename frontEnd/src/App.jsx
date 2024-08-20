import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './component/HomePage'
import Login from './component/Login'
import SignUp from './component/SignUp'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

function App() {

  const {authUser} = useSelector(store=>store.user)
  const [socket,setSocket]= useState(null)
  useEffect(()=>{
    if(authUser){
      console.log('User is authenticated')
      const socket = io('http://localhost:8000',{

      })

      setSocket(socket)
    }
  })

  return (
    <>
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
    <Router>
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    </Router>
  
     </>
  )
} 

export default App
