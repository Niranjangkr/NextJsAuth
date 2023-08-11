"use client";
import Link from "next/link"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });

    const [ buttonDisabled, setButtonDisabled ] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log("Signup successful",response.data);
            router.push('/login');
        } catch (error: any) {
            console.log("Signup failed ",error )
            toast.error("Something went wrong ")
        }finally{
            setLoading(false);  
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"Processing":"SignUp"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="text"
                name="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />

            <label htmlFor="email">Email</label>
            <input
                className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />

            <label htmlFor="password">password</label>
            <input
                className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="password"
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button disabled={buttonDisabled} onClick={onSignup} style={{backgroundColor: buttonDisabled?"":"gray"}} className="p-2 border rounded-lg mb-4 border-gray-300 focus:outline-none focus:border-gray-600">SignUp</button>
            <Link href="/login">Visit Login</Link>
        </div>
    )
}
