import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/UserModel"
import { NextRequest, NextResponse } from "next/server";
import  bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";
 
connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody)
        // add check later on to see if any null values are recieved or there in userData to send back response
        
        const user = await User.findOne({email});
        console.log(user)

        if(user){
            return NextResponse.json({error: "user already exists"}, {status: 400});
        }
        
        // hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        console.log(hashPassword);

        const newUser = new User({
            username,
            email,
            password: hashPassword
        });
        
        const savedUser = await newUser.save();

        // you can also make a separate page from frontend for verify email and from there you can send the verify email
        // verification email
        console.log("sendemailahesad");
        await  sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: "New User created Successfully",
            success: true,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}