import { Post } from "@/types/Post";
import { createSlice } from "@reduxjs/toolkit";

type PostInitialState = {
    posts:Post[]|[],
    selectedPost:Post|null,
}


const initialState:PostInitialState  = {
    posts:[],
    selectedPost:null
}

const PostSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        setAllPosts(state,{payload}){
            console.log(payload)
            state.posts = payload
        },
        increaseCommentCount(state,{payload}){
            state.posts = state.posts.map(post=>post._id== payload ? {...post,commentsCount:post.commentsCount+1}:post)
        },
        decreaseCommentCount(state,{payload}){
            state.posts = state.posts.map(post=>post._id== payload ? {...post,commentsCount:post.commentsCount-1}:post)
        },
        toggleLike(state,{payload}){
            state.posts = state.posts.map((post)=>{
                return post._id == payload ? {
                    ...post,
                    isLiked:!post.isLiked,
                    likesCount:post.isLiked 
                              ? post.likesCount-1
                              : post.likesCount+1
                } : post
            })
        }
    }
})

export const {setAllPosts,increaseCommentCount,decreaseCommentCount,toggleLike} = PostSlice.actions;

export default PostSlice;