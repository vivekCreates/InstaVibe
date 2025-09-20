export type User = {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export type UserProfile = {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    posts: [];
    bookmarks: [];
    followers: number;
    following: number;
    isFollowed: boolean;
    updatedAt: Date;
    createdAt: Date;
}