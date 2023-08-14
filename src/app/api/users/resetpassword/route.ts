import { NextResponse, NextRequest } from "next/server";
import User from "@/models/UserModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;
        // find the user in db using token and token expiry
        // if found hash the new password and update it in the db
        const user = await User.findOne({
            forgotPasswordToken:token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        if(!user){
            return NextResponse.json({message: "Invalid link or maybe expired"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        user.password = hashPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "success",
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}