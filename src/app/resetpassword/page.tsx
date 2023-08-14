"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ResetPassword(){

    const [ password, setPassword ] = useState("");
    const [ ConfirmPassword, setConfirmPassword ] = useState("");
    const [ passwordNotMatch, setPasswordNotMatch ] = useState(true);
    const [ token, setToken ] = useState("");

    const forgotPassword = async () => {
        const response = await axios.post("api/users/resetpassword", { token, password });
        console.log(response)
    }
    const handleClick = async () => {
        if(token.length > 0 ){
            forgotPassword();
        }else{
            alert("InvalidToken");
        }
    }

    useEffect(() => {
       const urlToken = window.location.search.split("=")[1];
       setToken(urlToken || "");
    }, []);

    const checkPass = (e: any) => {
        setConfirmPassword(e.target.value);
        if(password === e.target.value){
            setPasswordNotMatch(false);
        }else{
            setPasswordNotMatch(true);
        }
    }
    return(
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='p-2 text-[28px]'>Enter Your New password</h1>
            <label htmlFor="pass">Enter your new Password</label>
            <input className=' text-black' type="password" name='pass' value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="passConfirm">Confirm your new Password</label>
            <input  className=' text-black' type="password" name='passConfirm' value={ConfirmPassword} onChange={checkPass}  />
            <span className='text-red-500'>{ConfirmPassword.length > 0 && passwordNotMatch?"Password doesnt match":""}</span>
            <button className='p-2 mt-2 bg-green-500 text-black' disabled={passwordNotMatch} onClick={handleClick}>Submit</button>
        </div>
    )
}