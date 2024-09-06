import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const Prisma = new PrismaClient();
//const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = '8948acf72cef6d1c3463605efc4125d69e0be83528461a619852bd2914979ea2123b3bd830dab85085c8edc64b794abb2893cfbd1e6583fee2cdbceea75a42738c37c33849c662d43d01965128daab84192d35dfaf5588630545a088ba84226bcc99ec106e824ede2d8000f8d932dd5ff266e4a1dd2230648179dde4e682be9dd7ed1fc1aea5969956796aea231a4919aee4104949bd9b6ece8fe07c98013c3b80076fe8f2fd0178d2a17c9c0dd12d41ca77caeb85898720f6e6b7ca1615c89204eb6ef3480c1c9ff59dbdaedc0dbd6370a357967d5c22399bf42a1e8b303f1b2ee648978b1deee80a166189817f093fd20830e4c7e296c7855cabbde2269a55'; 


export async function POST(request: Request) {
  const { type, username, password, fullname } = await request.json();

  if (type === 'register') {
    try {
      // Handle registration
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          Fullname: fullname,
        },
      });

      // สร้าง JWT token
      const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, {
        expiresIn: '12h', // fix day token
      });

      const response = NextResponse.json({ success: true, user: newUser });
      response.cookies.set('token', token, { httpOnly: true });
      return response;

    } catch (error) {
      console.error('Registration error:', error);
      return NextResponse.json({ success: false, message: 'Username already exists.', error: error.message });
    }
  } else if (type === 'login') {
    try {
      // Handle login
      const user = await Prisma.user.findUnique({
        where: { username },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ success: false, message: 'Invalid username or password.' });
      }

      // JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: '12h', 
      });

      const response = NextResponse.json({ success: true, user });
      response.cookies.set('Brownyrollz-token', token, { httpOnly: true });
      response.cookies.set('Brownyrollz-Username', username , { httpOnly: true });
      return response;

    } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json({ success: false, message: 'Login failed.', error : error.message });
    }
  }

  return NextResponse.json({ success: false, message: 'Invalid request type.' });
}
