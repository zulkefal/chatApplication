import React from 'react'

const OtherUser = (props) => {
    const user = props.user;
  return (
    <div>
        <div className='flex gap-2 items-center hover:bg-zinc-500 rounded-sm p-2 curspor-pointer'>
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
     </div>
  )
}

export default OtherUser
