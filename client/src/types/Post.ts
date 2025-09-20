export type Post = {
    _id:string;
    postImage:string;
    caption:string;
    isLiked:boolean;
    user:{
        _id:string,
        username:string,
        avatar:string,
    },
    commentsCount:number;
    likesCount:number;
    createdAt:Date;
    updatedAt:Date
}