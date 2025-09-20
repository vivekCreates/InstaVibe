import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./Layout";
import Protected from "./pages/Protected";
import { logIn, setAuthDetails, updateIsLoginCheckDone } from "./store/AuthSlice";
import AuthService from "./services/auth/AuthService";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import RedirectAuthenticatedUser from "./pages/RedirectUser";
import { Loader } from "./components/Loader";
import Profile from "./pages/Profile";

function App() {

  
const dispatch = useAppDispatch();

useEffect(()=>{
  const fetchUser = async()=>{
    try {
      const response = await AuthService.getLoggedInUser();

      if(response.success){
        dispatch(setAuthDetails(response))
        dispatch((updateIsLoginCheckDone(false)))
      }
       dispatch(setAuthDetails(response))
    } catch (error:any) {
      console.log(error?.message)
    }
  }
  fetchUser()
},[dispatch])


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={
              <Protected>
                <Home />
              </Protected>
              }/>
            <Route path="/profile" element={
              <Protected>
                <Profile />
              </Protected>
              }/>
      
          </Route>
        <Route path="/register" element={
          <RedirectAuthenticatedUser>
              <Register />
          </RedirectAuthenticatedUser>
        }/>

        <Route path="/login" element={<RedirectAuthenticatedUser>
              <Login />
          </RedirectAuthenticatedUser>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App