import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../lib/Models/User";
import DBconnect from "../../../../../lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await DBconnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please sign up" },
        { status: 401 }
      );
    }

    if (password !== user.password) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", user: { id: user._id, email: user.email } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
