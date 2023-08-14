"use client";
import Link from "next/link"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import { toast } from "react-hot-toast";
import { sendEmail } from "@/helpers/mailer";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login Success");
            router.push('/Profile');
        } catch (error: any) {
            console.log("Login failed", error);
            if (error.response.request.status === 400) {
                // Error response received from the server
                alert("Invalid Credentials "+ error.response.data.message)
                toast.error('Invalid credentials');
            } else if (error.request) {
                // Request made, but no response received
                console.log("second")
                toast.error("Request made, but no response received");
            } else {
                // Other errors (e.g., network issues)
                console.log("network")
                toast.error("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    }


    // work remaining here
    const forgotPassword = async (email: any) => {
        try {
            setResetLoading(true);
            const res = await axios.post('api/users/meEmail', user)
            if(res.data.status === 200){
                alert("reset email has been sent to your Email");
                setResetLoading(false);
            }
        } catch (error) {
            alert("make sure you entered the correct email")
            toast.error("something went wrong try again later");
            console.log("hi", error);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "processing" : "Login"}</h1>
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
            <button disabled={buttonDisabled} style={{ backgroundColor: buttonDisabled ? "" : "gray" }} onClick={onLogin} className="p-2 border rounded-lg mb-4 border-gray-300 focus:outline-none focus:border-gray-600 ">Login</button>
            <button className="bg-green-400 p-2 rounded-lg text-black" onClick={() => user.email ? forgotPassword(user.email) : alert("Enter Email")}>{resetLoading?"Processing":"Forgot password ?"}</button>
            <Link href="/signup">Visit Signup</Link>
        </div>
    )
}