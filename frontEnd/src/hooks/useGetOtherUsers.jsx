import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOtherUsers } from '../redux/Slices/userSlice';
const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    try {
    
        const getUser = async () => {
            const response = await fetch("http://localhost:8000/api/user/",
              {method: 'GET',
              credentials: 'include'})
            const data = await response.json()

            dispatch(setOtherUsers(data))
            

        }
        getUser();
        
    } catch (error) {
      console.error("Error in getting users:", error);
    }
  },[])
}

export default useGetOtherUsers
