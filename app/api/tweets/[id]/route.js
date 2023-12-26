import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await prisma.tweet.delete({ where: { id: id } });
    return new NextResponse("tweet has been deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};
export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    const tweet = await prisma.tweet.findUnique({ where: { id: id } });
    return new NextResponse(JSON.stringify(tweet), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  const { id } = params;
  const { newDesc } = await req.json();
  try {
    const updatedTweet = await prisma.tweet.update({
      where: { id: id },
      data: { description: newDesc },
    });
    return new NextResponse(JSON.stringify(updatedTweet), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};
