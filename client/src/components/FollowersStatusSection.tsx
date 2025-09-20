import React from 'react'
import FollowersStatusCard from './FollowersStatusCard'

function FollowersStatusSection() {
  return (
    <div className='w-[60%] mb-10 flex '>
        <FollowersStatusCard/>
        <FollowersStatusCard/>
        <FollowersStatusCard/>
        <FollowersStatusCard/>
        <FollowersStatusCard/>
    </div>
  )
}

export default FollowersStatusSection