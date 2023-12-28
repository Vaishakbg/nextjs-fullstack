"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const onLogin = async () => {
      try{
        setIsLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("Login Success", response.data);
        toast.success("Login success");
        router.push('/profile')
      } catch (error: any) {
        console.log("Login failed", error.message)
        toast.error(error.message)

      } finally {
        setIsLoading(false);
      }
    }

    React.useEffect(()=>{
      if(user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false)
      } else {
        setButtonDisabled(true)
      }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{isLoading ? 'Processing...' : 'Login'}</h1>
            <hr />

            <label htmlFor="email">Email</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              id="email"
              type="text"    
              value={user.email}
              onChange={(e)=> setUser({...user, email: e.target.value})}
              placeholder="email"    
            />
            <label htmlFor="password">Password</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              id="password"
              type="password"    
              value={user.password}
              onChange={(e)=> setUser({...user, password: e.target.value})}
              placeholder="password"    
            />
            <button
              onClick={onLogin}
              className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'opacity-50':''}`}
              disabled={buttonDisabled}>Login here</button>
            <Link href="/signup"> Visit signup page </Link>
        </div>
    )
}