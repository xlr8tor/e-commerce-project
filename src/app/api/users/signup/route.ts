import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getErrorMessage } from "@/helpers/customError";
import prisma from "@/libs/prismadb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, email, hashedPassword },
    });

    return NextResponse.json(user);
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
