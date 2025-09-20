import React from 'react'

function CreatePostModal() {
  return (
    <div className='w-screen h-screen fixed flex items-center justify-center'>
        <div className='w-[60rem] h-[30rem]'>
        <div>
            <div className='w-[40rem] py-2 bg-gray-300 flex items-center justify-center'>
            <h1 className='font-semibold'>Create Post</h1>
            </div>
            <div className='w-full h-full'></div>
        </div>

        <div className='w-[20rem] h-full bg-blue-600'></div>
        </div>

    </div>
  )
}

export default CreatePostModal