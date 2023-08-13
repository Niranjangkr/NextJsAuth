import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup" || path === "/" || path === "/verifyemail";
    const token = request.cookies.get("token")?.value || "";
    if(isPublicPath && token){  
        return NextResponse.redirect(new URL("/Profile", request.nextUrl));
    }
    
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// see matching path
export const config = {
    matcher: [
        "/",
        "/Profile",
        "/Profile/:path*",
        "/login",
        "/signup",
        "/verifyemail"
    ]
}