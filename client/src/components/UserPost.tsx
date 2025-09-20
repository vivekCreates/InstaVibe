import React from 'react'

function UserPost({postImage}:{postImage:string}) {
  return (
    <figure className='w-[16.5rem] h-[20rem] bg-red-300 object-center object-cover'>
        <img src={postImage} className='w-full h-full' alt="" />
    </figure>
  )
}

export default UserPost