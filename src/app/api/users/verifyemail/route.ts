import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token, 'hi');
        const user = await User.findOne({
            VerifyToken: token,
            VerifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 500 });
        }

        console.log("This is User", user);

        user.isVerified = true;
        user.VerifyToken = undefined;
        user.VerifyTokenExpiry = undefined;
        console.log("updating");
        await user.save();
        console.log("updated");

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}