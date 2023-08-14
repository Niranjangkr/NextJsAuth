"use client";


import axios from "axios";
import Link from "next/link";
import { NextResponse } from "next/server";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define the type/interface for the user data
interface UserData {
    _id: string;
    // Add other properties you expect from the API response
}

export default function ProfilePage() {
    const [ data, setData ] = useState<UserData | string>("Nothing");
    const router = useRouter();
    const logOut = async () => {
        try {
            const response = await axios.get("api/users/logout");
            console.log(response);
            toast.success("Logout success");
            router.push('/login');
        } catch (error: any) {
            console.log(error);
            toast.error(error);
        }
    }

    const getUserDetails = async () => {
        try {
            const response = await axios.get("api/users/me");
            setData(response.data.data)
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Profile page </h1>
            <hr />
            <h1 className="bg-green-700 p-3 rounded-lg">
            {typeof data === "object" ? <Link href={`Profile/${data._id}`}>{data._id}</Link> : data}
            </h1>
            <button className="mt-2 bg-sky-500 p-2 rounded-lg text-black" onClick={logOut}>Log Out</button>
            <button className="mt-2 bg-green-500 p-2 rounded-lg text-black" onClick={getUserDetails}>Get data</button>
        </div>
    )
}