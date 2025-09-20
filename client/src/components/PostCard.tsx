import CommentService from '@/services/comment/CommentService'
import LikeService from '@/services/like/LikeService'
import { useAppSelector } from '@/store'
import { Post } from '@/types/Post'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { AlertTriangle, Bookmark, BookMarked, DotIcon, Ellipsis, Heart, MessageCircleMore } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


type PostProps = {
    post: Post;
    handleComment: (postId: string, comment: string) => void;
    handleLikes: (postId: string) => void;
   
}

function PostCard({ post, handleComment, handleLikes }: PostProps) {

    const [comment, setComment] = useState<string>("");
    const [isLike, setIsLike] = useState<boolean>(false);




    return (
        <div className='w-[25rem] flex flex-col'>
            <div className='w-full  flex justify-between items-center'>
                <div className='flex gap-2 py-2 items-center'>

                    <Avatar>
                        <AvatarImage src={post.user.avatar} className='w-8 h-8 rounded-full' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <h1>{post.user.username}</h1>
                </div>
                <Ellipsis />
            </div>
            <div className='border-1 border-zinc-300 w-full h-[35rem] object-fit object-center'>
                <img src={post.postImage} className="w-full h-full" alt="" />
            </div>
            <div className='w-full'>
                <div className='w-full flex justify-between items-center'>
                    <div className='flex gap-2 py-2'>
                        {
                            isLike ? <Heart fill='red' onClick={() => {
                                setIsLike(!isLike)
                                handleLikes(post._id)
                            }
                            } />
                                : <Heart onClick={() => {
                                     setIsLike(!isLike)
                                    handleLikes(post._id)
                                } }/>
                        }


                        <MessageCircleMore />
                    </div>
                    <Bookmark />
                </div>

                <div className=''>
                    <p>{post.likesCount} Likes</p>
                    <p>{post.caption}</p>
                </div>
                <p>{post.commentsCount} comments</p>
                <div className='w-full border-1 border-b-zinc-300 '>
                    <input onChange={(e) => setComment(e.target.value)} type="text" className='outline-none p-2 border-none w-[90%]' placeholder='Add a comment' value={comment} />
                    <button onClick={() => {
                        setComment("")
                        handleComment(post._id, comment)

                    } }>Post</button>
                </div>
            </div>
        </div>
    )
}

export default PostCard