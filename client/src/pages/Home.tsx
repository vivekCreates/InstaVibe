import FollowersStatus from '@/components/FollowersStatusCard'
import FollowersStatusSection from '@/components/FollowersStatusSection'
import PostViewModal from '@/components/modal/PostViewModal'
import PostCard from '@/components/PostCard'
import CommentService from '@/services/comment/CommentService'
import LikeService from '@/services/like/LikeService'
import PostService from '@/services/post/PostService'
import { useAppSelector } from '@/store'
import { increaseCommentCount, setAllPosts, toggleLike } from '@/store/PostSlice'
import { Post } from '@/types/Post'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

function Home() {

  const dispatch = useDispatch();
   const { posts } = useAppSelector(state => state.post);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await PostService.getAllPosts();

        if (response.success) {
          dispatch(setAllPosts(response.data))
          toast.success(response.message)
        }
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    }
    getAllPosts();
  }, [])

 

   const handleCommentSubmit = async (postId: string,comment:string) => {
        try {
            dispatch(increaseCommentCount(postId))
            const response = await CommentService.createComment(postId, comment)
            if (response.success) {
                toast.success(response.message);
                return;
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    const handleLikes = async(postId:string)=>{
      try {
        dispatch(toggleLike(postId));
        const response = await LikeService.likeOrDislike(postId);
        if(response.success){
          toast.success(response.message);
          return;
        }
      } catch (error:any) {
        dispatch(toggleLike(postId))
        toast.error(error.response.data?.message);
      }
    }

  return (
    <>
    {/* <PostViewModal/> */}
    <div className='w-full h-full px-[15rem] py-[1rem] mx-auto'>
      

      <FollowersStatusSection />
      <div className='flex flex-col gap-10 '>

      
      {
        posts?.map(post=>(
          <PostCard key={post._id} post={post} handleComment={handleCommentSubmit} handleLikes={handleLikes}/>
        ))
      
        }
      </div>
    </div>
    </>
  )
}

export default Home