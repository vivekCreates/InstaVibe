import { Loader } from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import UserPost from '@/components/UserPost'
import AuthService from '@/services/auth/AuthService'
import PostService from '@/services/post/PostService'
import { useAppSelector } from '@/store'
import { UserProfile } from '@/types/User'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

import { Bookmark, Grid3x3 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


function Profile() {
    const { user } = useAppSelector(state => state.auth)

    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [postOrBookmark, setPostOrBookmark] = useState<"post" | "bookmark">("post")

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true)
                const response = await AuthService.getUserProfile(user?._id!)
                console.log(response.data)
                if (response.success) {
                    setProfile(response?.data)
                    toast.success(response.message);
                    return;
                }
            } catch (error: any) {
                toast.error(error.response.data?.message)
            } finally {
                setLoading(false);
            }
        }
        fetchUserProfile()
    }, [])

    if (loading) {
        return <Loader />
    }
    return (
        <div className='w-full h-full px-[15rem] py-[1rem] mx-auto'>
            <div className='flex gap-32 py-5 items-center mb-40'>
                <Avatar className='w-35 h-35 object-center object-cover overflow-hidden rounded-full'>
                    <AvatarImage src={profile?.avatar} className='w-full h-full' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-6 items-center'>
                        <h1>{profile?.username}</h1>
                        <Dialog>
                            <DialogTrigger>Open</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className='flex gap-6'>
                        <p>{profile?.posts?.length} post</p>
                        <p>{profile?.followers} follower</p>
                        <p>{profile?.following} following</p>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className='w-full border-gray-400 border-b-1 p-2'>
                <div className='flex'>
                    <div className='w-1/2 flex  items-center justify-center'>
                        <Grid3x3 onClick={() => setPostOrBookmark("post")} className={` hover:cursor-pointer ${postOrBookmark == "post" && 'border-b-2'} pb-1 border-gray-500`} />
                    </div>
                    <div className='w-1/2 flex  items-center justify-center'>

                        <Bookmark onClick={() => setPostOrBookmark("bookmark")} className={`hover:cursor-pointer ${postOrBookmark == "bookmark" && 'border-b-2'} pb-1 border-gray-500 `} />
                    </div>
                </div>
            </div>
            <div className='flex gap-2 p-2 flex-wrap'>
                {
                    postOrBookmark == "post" &&
                    profile?.posts.map((post) => (
                        <UserPost key={post._id} postImage={post.postImage} />
                    ))
                } {
                }

                {
                    postOrBookmark == "bookmark" &&
                    profile?.bookmarks.map((post) => (
                        <UserPost key={post._id} postImage={post.postImage} />
                    ))
                } {
                }

            </div>
        </div>

    )
}

export default Profile