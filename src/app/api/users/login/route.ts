import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/UserModel"
import { NextResponse, NextRequest } from "next/server"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password }  = reqBody;
        console.log(reqBody);

        // check the details of User exist in db 
        const user = await User.findOne({email});
        
        if(user){
            // check if the password is correct 
            const validPassword = await bcryptjs.compare(password, user.password);
            if(!validPassword){
                return NextResponse.json({error: "password is not valid"}, {status: 400});
            }

            // create token data 
            const TOKEN_DATA = {
                id: user._id,
                username: user.username,
                email: user.email
            };
            
            // create token 
            const token = await jwt.sign(TOKEN_DATA, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

            // create a response and set the cookie using that
            const response =  NextResponse.json({
                message: "succesfully logged in",
                success: true
            });

            response.cookies.set("token", token, {
                httpOnly: true
            });

            return response;
        }else{
            return NextResponse.json({error: "User does not exists in the database"}, {status: 400});   
        }

    } catch (error) {
        return NextResponse.json({ error: "something went wrong" }, {status: 500});
    }
}

