import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

function FollowersStatusCard() {
  return (
    <div className='flex flex-col w-30 h-30 items-center justify-center'>
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" className='w-20 h-20 rounded-full'  />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className='text-sm'>vivekkumar</p>
    </div>
  )
}

export default FollowersStatusCard