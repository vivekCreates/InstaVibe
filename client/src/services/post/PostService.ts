import apiClient from "@/utils/axios"

class PostService {

    BASE_URL = "/api/v1/posts"

    async getAllPosts() {
        const response = await apiClient.get(`${this.BASE_URL}/all-posts`);
        return response.data
    }

    async getOnePost(postId: string) {
        const response = await apiClient.get(`${this.BASE_URL}/${postId}`);
        return response.data
    }


    async createPost(caption: string, postImage: string) {
        const response = await apiClient.post(`${this.BASE_URL}/create`, { caption, postImage });
        return response.data
    }


    async updatePost(postId: string, caption?: string, postImage?: string) {
        const response = await apiClient.patch(`${this.BASE_URL}/upadte/${postId}`, { caption, postImage });
        return response.data
    }

    async deletePost(postId: string) {
        const response = await apiClient.delete(`${this.BASE_URL}/delete/${postId}`);
        return response.data
    }
}


export default new PostService();
