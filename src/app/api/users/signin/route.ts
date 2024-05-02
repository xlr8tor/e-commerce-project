import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import { getErrorMessage } from "@/helpers/customError";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Email or password invalid" },
        { status: 400 }
      );
    }

    const tokenData: { id: ObjectId; username: string; email: string } = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    res.cookies.set("token", token, { httpOnly: true });
    return res;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
