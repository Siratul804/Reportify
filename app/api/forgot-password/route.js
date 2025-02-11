import { NextResponse } from "next/server";
import { connectToDB } from "../../db/connection";
import { User } from "../../db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function PUT(req) {
  try {
    // Extract authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token." }, { status: 403 });
    }

    // Parse request body
    const body = await req.json();
    const { current_password, new_password } = body;

    if (!current_password || !new_password) {
      return NextResponse.json(
        { error: "Both current and new passwords are required." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Find user by ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Compare current password
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 401 }
      );
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(new_password, salt);

    // Save updated user
    await user.save();

    return NextResponse.json(
      { status: "success", message: "Password updated successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating password:", err);
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
