import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
    try {
        const _id = await getDataFromToken(request);
        console.log(_id);
        const userData = await User.findOne({_id}).select("-password");
        return NextResponse.json({
            message: "User Found",
            data: userData
        });
    } catch (error: any) {
        return NextResponse.json({ error: "Sorry its not you its us... Server Error" }, { status: 500 });
    }
}