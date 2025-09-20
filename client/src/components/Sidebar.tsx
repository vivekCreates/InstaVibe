import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Home, Search, Bell, Plus, type Icon, LucideIcon, LucideProps, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useAppDispatch } from '@/store';
import { logOut } from '@/store/AuthSlice';
import toast from 'react-hot-toast';
import CreatePostModal from './modal/CreatePostModal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';


type IconItem = {
    name: string;
    icon: LucideIcon;
    path: string;
};



function Sidebar() {

    const dispatch = useAppDispatch()

    const links: IconItem[] = [
        { name: "Home", icon: Home, path: "/" },
        { name: "Search", icon: Search, path: "/search" },
        { name: "Notification", icon: Bell, path: "/notification" },

        // {name:"Profile",path:"/profile"},

    ]

    const [openCreatePostModal, setOpenCreatePostModel] = useState<boolean>(false);
    const [caption, setCaption] = useState("");
    const [filename, setFileName] = useState("");


    const handleChange = (e)=>{

    }

    return (<>
        {
            openCreatePostModal && <CreatePostModal />
        }
        <div className='w-[15%] h-screen fixed flex flex-col justify-between gap-4 p-4 border-1 border-r-zinc-300'>
            <div className='p-4 h-[10vh]'>
                <h1 className='font-semibold text-3xl '>InstaVibe</h1>
            </div>
            <ul className='flex flex-col gap-3 h-[90vh]'>
                {
                    links.map(({ name, icon: Icon, path }) => (
                        <li key={name} className='w-full text-lg flex gap-2 px-2 p-2 items-center justify-start hover:bg-gray-100 rounded-md'>
                            <Icon size={20} />
                            <Link to={path}>{name}</Link>
                        </li>
                    ))
                }
                <li onClick={() => setOpenCreatePostModel(!openCreatePostModal)} className='w-full text-lg flex gap-2 px-2 p-2 items-center justify-start hover:bg-gray-100 rounded-md'>
                    <Plus />
                    Create
                </li>

                <li className='w-full text-lg flex gap-2 px-2 p-2 items-center justify-start hover:bg-gray-100 rounded-md'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" className='w-5 h-5 rounded-full' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Link to={"/profile"}>
                        <Dialog>
                            <DialogTrigger>Profile</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='mb-4'>Create Post</DialogTitle>
                                    <DialogDescription>
                                        <form action="" className='flex flex-col gap-4'>
                                            <Input 
                                            name='caption'
                                            placeholder='caption'
                                            onChange={(e)=> setCaption(e.target.value)}
                                            />
                                            <Input
                                                id="file"
                                                type="file"
                                                className="cursor-pointer"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) setFileName(file.name)
                                                }}
                                            />
                                            <Button type='submit' variant={'outline'} className='bg-black text-white'>Post</Button>
                                        </form>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </Link>
                </li>

            </ul>
            <div className='flex flex-col gap-2 w-full'>
                <div onClick={() => {
                    dispatch(logOut())
                    toast.success("Logged out successfully")
                }} className='w-full flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md '>
                    <LogOut className='text-red-500' size={20} />
                    <span> LogOut</span>
                </div>
            </div>

        </div>
    </>
    )
}

export default Sidebar