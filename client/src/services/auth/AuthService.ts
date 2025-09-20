import { User } from "../../types/User";
import apiClient from "../../utils/axios";
import {  ApiResponse } from "../../types/apiResponse";




class AuthService {

    BASE_URL = "/api/v1/users";

    async register(
        username: string,
        email: string,
        password: string
        ): Promise<User | any> {

            const response = await apiClient.post<ApiResponse<any>>(`${this.BASE_URL}/register`, {
                username,
                email,
                password
            });

        return response.data;
    }

    async login(username: string, password: string): Promise<User | any> {
       
            const response = await apiClient.post<ApiResponse<User>>(`${this.BASE_URL}/login`, {
                username,
                password
            });

          return response.data;
    }

    async logout(): Promise<any> {
            const response = await apiClient.post<ApiResponse<null>>(`${this.BASE_URL}/logout`);
            return response.data;
    }

    async getLoggedInUser(): Promise<any> {
      
        const response = await apiClient.get<ApiResponse<User>>(`${this.BASE_URL}/me`);
        return response.data;
    }

    async getUserProfile(userId: string): Promise<any> {
       
          const response = await apiClient.get(`${this.BASE_URL}/profile/${userId}`);
          return response.data;
    }

    async updateUserProfile(username: string, email: string, avatar: string): Promise<User | void> {
        
            const response = await apiClient.patch(`${this.BASE_URL}/update-profile`, {
                username,
                email,
                avatar
            });
        return response.data;
    }

    async changePassword(oldPassword: string, newPassword: string) {
     
            const response = await apiClient.post(`${this.BASE_URL}/chage-password`, {
                oldPassword,
                newPassword
            });

          return response.data;
    }
}


export default new AuthService();