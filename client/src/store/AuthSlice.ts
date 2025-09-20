import {createSlice} from "@reduxjs/toolkit";
import {User} from "../types/User";


interface AuthSliceTypes{
    user:null|User;
    isLoggedIn: boolean;
    isLoading:boolean
}

const initialState:AuthSliceTypes={
    user:null,
    isLoggedIn:false,
    isLoading:true
}   


const AuthSlice=createSlice({
    name:"auth",
    initialState,   
    reducers:{
        logIn(state,{payload}){
          state.isLoggedIn = true;
          state.user = payload
        },
        logOut(state){
            state.isLoggedIn = false;
            state.user = null;
        },

        setAuthDetails(state,{payload}){
            if(payload.success){
                state.isLoggedIn = true;
                state.user  = payload.data
            }else{
                 state.isLoggedIn = false;
                state.user  = null
            }
        },
        updateIsLoginCheckDone(state,{payload}){
            state.isLoading = payload
        }
    }    
})


export const {logIn,logOut,setAuthDetails,updateIsLoginCheckDone} = AuthSlice.actions;

export default AuthSlice;