import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export const GET = async (req) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        tweet: true,
      },
    });
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();
    const hashPassword = await bcrypt.hash(password, 6);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashPassword },
    });
    console.log(newUser);
    return new NextResponse(newUser, { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
