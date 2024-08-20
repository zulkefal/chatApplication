import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/Slices/userSlice';

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/", {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        dispatch(setOtherUsers(data));
      } catch (error) {
        console.error("Error in getting users:", error);
      }
    };

    getUser();
  }, [dispatch]); 

  return null; 
};

export default useGetOtherUsers;
