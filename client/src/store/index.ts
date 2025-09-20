import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import PostSlice from "./PostSlice";



const store = configureStore({
    reducer:{
        auth:AuthSlice.reducer,
        post:PostSlice.reducer
    }
})


export type ReduxRootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<ReduxRootState> = useSelector;

export type ReduxDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch<ReduxDispatch>

export default store;