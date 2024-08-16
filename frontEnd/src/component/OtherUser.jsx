import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/Slices/userSlice';

const OtherUser = ({user}) => {
    const dispatch = useDispatch();
const {selectedUser}= useSelector(store=>store.user)
    const selectedUserHandle =()=>{
        dispatch(setSelectedUser(user))
    }
  return (
    <>
        <div onClick={()=>selectedUserHandle(user)} className={`${selectedUser?._id === user?._id ? 'bg-zinc-400' : 'bg-zinc-600'} flex gap-2 items-center hover:rounded-sm p-2 curspor-pointer`}>
            <div className='avatar online'>
                <div className='w-12 rounded-full'> <img src={user?.profilePhoto} alt="user-profile" /></div>
            </div>
            <div className=''>
                <div className='flex justify-between gap-2'> 
                    <p className='text-white'>{user?.fullName}</p>
                </div>
            </div>
        </div>
        <div className="divider my-0 py-0 h-1"></div>
     </>
  )
}

export default OtherUser
