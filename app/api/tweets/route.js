import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req) => {
  try {
    const tweets = await prisma.tweet.findMany({});
    return new NextResponse(JSON.stringify(tweets), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const { description, userId } = await req.json();

    const newTweet = await prisma.tweet.create({
      data: { description, userId },
    });

    return new NextResponse(JSON.stringify(newTweet), { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
