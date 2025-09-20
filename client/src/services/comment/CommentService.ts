import apiClient from "@/utils/axios"

class CommentService{
    BASE_URL="/api/v1/comments"

    async createComment(postId:string,comment:string){
        const response = await apiClient.post(`${this.BASE_URL}/create/${postId}`,{comment})
        return response.data;
    }

    async updateComment(commentId:string,comment:string){
        const response = await apiClient.patch(`${this.BASE_URL}/update/${commentId}`,{comment})
        return response.data;
    }

    async deleteComment(commentId:string){
        const response = await apiClient.delete(`${this.BASE_URL}/delete/${commentId}`)
        return response.data;
    }


    async getCommentsById(postId:string){
        const response = await apiClient.get(`${this.BASE_URL}/${postId}`)
        return response.data;
    }
}

export default new CommentService();