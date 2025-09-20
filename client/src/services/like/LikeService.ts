import apiClient from "@/utils/axios";

class LikeService{
    BASE_URL = "/api/v1/likes"
     async likeOrDislike(postId:string){
        const response = await apiClient.post(`${this.BASE_URL}/${postId}`);
        return response.data
    }
}


export default new LikeService();