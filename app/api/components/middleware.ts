// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // ถ้าไม่มี token ให้ redirect ไปที่หน้า login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // ตรวจสอบและถอดรหัส token
    jwt.verify(token, JWT_SECRET);
    // ถ้าถูกต้องให้ไปที่หน้าเดิม
    return NextResponse.next();
  } catch (error) {
    // ถ้า token ไม่ถูกต้องหรือหมดอายุ ให้ redirect ไปที่หน้า login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// กำหนด path ที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // สามารถเพิ่ม path อื่น ๆ ที่ต้องการให้ตรวจสอบ session
};
