"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const onSignup = async () => {
      try{
        setIsLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup Success", response.data);
        router.push('/login')

      } catch (error: any) {
        console.log("Signup failed", error.message)
        toast.error(error.message)

      } finally {
        setIsLoading(false);
      }
    }

    React.useEffect(()=>{
      if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
        setButtonDisabled(false)
      } else {
        setButtonDisabled(true)
      }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{isLoading ? 'Processing...' : 'Signup'}</h1>
            <hr />

            <label htmlFor="username">userName</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              id="username"
              type="text"    
              value={user.username}
              onChange={(e)=> setUser({...user, username: e.target.value})}
              placeholder="username"    
            />
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
              onClick={onSignup}
              className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'opacity-50':''}`}
              disabled={buttonDisabled}>Signup here</button>
            <Link href="/login"> Visit login page </Link>
        </div>
    )
}