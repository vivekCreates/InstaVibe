import React from 'react'

function PostViewModal() {
  return (
    <div className='w-full h- absolute flex item-center justify-center bg-red-700 '>
        <div className='w-[60%] h-[80%] flex'>
            <figure className='w-1/2 h-full object-center object-cover'>
            <img src="" className='w-full h-full' alt="" />
            </figure>
            <div className='w-1/2 h-full'>
                <div className='h-[20%] bg-blue-200'></div>
                <div className='h-[60%] bg-green-200'></div>
                <div className='h-[20%] bg-red-200'></div>
            </div>
        </div>
    </div>
  )
}

export default PostViewModal