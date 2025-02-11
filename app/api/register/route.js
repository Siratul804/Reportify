import { NextResponse } from "next/server";
import { connectToDB } from "../../db/connection";
import { User } from "../../db/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, phone, password } = body;

    console.log("Received User:", {
      email,
      phone,
      password,
    });

    // Validate input
    if (!phone || !email || !password) {
      return NextResponse.json(
        { error: "Fields are required." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      phone_number: phone,
    });

    // Save the new user to the database
    await newUser.save();
    console.log("New user created:", newUser);

    // Return a success response
    return NextResponse.json(
      { message: "User registered.", user_id: newUser._id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error during user registration:", err);
    return NextResponse.json(
      { error: "An error occurred during registration. Please try again." },
      { status: 500 }
    );
  }
}
