import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AuthService from '@/services/auth/AuthService';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import toast from "react-hot-toast"
import { Loader } from '@/components/Loader';
import { logIn } from '@/store/AuthSlice';
import { useAppDispatch, useAppSelector } from '@/store';

function Login() {
  
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  


  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("")
      const response = await AuthService.login(username, password);
      if (response.success) {
        setUsername("");
        setPassword("");
        toast.success(response.message);
        console.log(response.data)
        dispatch(logIn(response.data))
        navigate("/")
        return;
      }
    } catch (error: any) {
      setError(error?.response.data.message)
  } finally {
    setLoading(false);
  }
}

return (
  <div className='w-screen h-screen flex items-center justify-center'>
    <div className='w-[20rem] p-6 rounded-lg flex flex-col gap-6 border-1 border-black'>
      <h1 className='text-3xl text-center font-semibold'>InstaVibe</h1>
      {error &&
        <p className='text-red-500 text-center text-sm'>{error}</p>
      }
      <form onSubmit={handleRegister}>
        <div className='flex flex-col gap-4 text-3xl'>
          <Input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit' className='bg-black text-white'>
            {
              loading ? <Loader/> : "Login"
            }
          </Button>
        </div>
        <p className='text-sm mt-4'>Don't have an account? <Link to={"/register"} >Register</Link></p>
      </form>
    </div>
  </div>
)
}

export default Login