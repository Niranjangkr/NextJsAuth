import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        console.log(email)
        if (!email) {
            return NextResponse.json({ error: "Email parameter is missing" }, { status: 400 });
        }
        const userData = await User.findOne({email});
        console.log(userData);
        if(!userData){
            return NextResponse.json({message: "User not found Invalid email"}, {status: 400});
        }
        const userId = userData._id;

        // sending forgot password email
        const res = await sendEmail({ email, emailType: "RESET", userId});

        return NextResponse.json({
            message: "User found",
            data: res,
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({ error: "Sorry its not you its us... Server Error" }, { status: 500 });
    }
}