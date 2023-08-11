"use client";
import Link from "next/link"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [ buttonDisabled, setButtonDisabled ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login Success")
            router.push('/Profile');
        } catch (error: any) {
            console.log("Login failed",error);
            toast.error(error.message);
        } finally{  
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"processing":"Login"}</h1>
            <hr />
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
            <button disabled = {buttonDisabled} style={{backgroundColor: buttonDisabled?"":"gray"}} onClick={onLogin} className="p-2 border rounded-lg mb-4 border-gray-300 focus:outline-none focus:border-gray-600 ">Login</button>
            <Link href="/signup">Visit Signup</Link>
        </div>
    )
}