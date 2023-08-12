import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: any = Jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
} 