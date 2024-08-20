import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './component/HomePage'
import Login from './component/Login'
import SignUp from './component/SignUp'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import io from 'socket.io-client'
import { setConnectionStatus } from './redux/Slices/socketSlice'
import { setOnlineUsers } from './redux/Slices/userSlice'

function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const {socket} = useSelector(store => store.socket);

  useEffect(() => {
    if (authUser) {
      console.log('User is authenticated');
      const socket = io('http://localhost:8000', {
        query: {
          userID: authUser._id,
        },
        withCredentials: true,
      });

      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
        dispatch(setConnectionStatus(true));
      });

      socket.on('getOnlineUsers', (data) => {
        console.log('Online Users', data);
        dispatch(setOnlineUsers(data));
      });

      // socket.on('disconnect', () => {
      //   console.log('Socket disconnected');
      //   dispatch(setConnectionStatus(false));
      // });

  
    }
    else{

      if(socket)
      {
        socket.close();
        dispatch(setConnectionStatus(null))
      }

    }
  }, [authUser, dispatch]);


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
