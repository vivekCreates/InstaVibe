import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AuthService from '@/services/auth/AuthService';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import toast from "react-hot-toast"
import { Loader } from '@/components/Loader';
import { User } from 'lucide-react';

function Register() {

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("")
      const response = await AuthService.register(username, email, password);
      if (response.success) {
        setUsername("");
        setEmail("");
        setPassword("");
        toast.success(response.message);
        navigate("/login");
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
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              loading ? <Loader/> : "Register"
            }
          </Button>
        </div>
        <p className='text-sm mt-4'>Already have an account? <Link to={"/login"} >Login</Link></p>
      </form>
    </div>
  </div>
)
}

export default Register