"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { error } from 'console';


export default function() {
    const [ token, setToken ] = useState("");
    const [ Error, setError ] = useState(false);
    const [ verified, setVerified ] = useState(false);

    const verifyEmail = async () =>{
        try {
            const response = await axios.post("api/users/verifyemail", { token });
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() =>{
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
    }, [])
    useEffect(() => {
        if(token.length > 0){
            verifyEmail();
        }
    }, [token]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-5xl'>Verify Email</h1>
            <h2 className='p-2 bg-orange-500 text-black'>{token?`${token}`:"No token"}</h2>

            {
                verified&&(
                    <div>
                        <h2 className='text-2xl'>Email Verified</h2>
                        <Link href={"/login"}>Login</Link>
                    </div>
                )
            }
            {
                Error&&(
                    <div>
                        <h2 className='text-2xl bg-red-500 text-black'>Email Not Verified-error</h2>
                    </div>
                )
            }
        </div>
    )
}
 