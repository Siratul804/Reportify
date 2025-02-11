import { connectToDB } from "../../db/connection";
import { Crime } from "@/app/db/models/Crime";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const ACCESS_KEY = process.env.ACCESS_TOKEN_SECRET;

export async function POST(req) {
  try {
    // Check for authorization header
    const authorization = req.headers.get("Authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token is required." },
        { status: 401 }
      );
    }

    const token = authorization.split(" ")[1];

    // Verify the access token
    const decoded = jwt.verify(token, ACCESS_KEY);
    if (!decoded || !decoded.user_id) {
      return NextResponse.json(
        { error: "Invalid or expired access token." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      title,
      description,
      division,
      district,
      crime_time,
      images,
      video,
    } = body;

    // Validate the request body
    if (!title || !description || !division || !district || !crime_time) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Create a new crime report
    const newCrimeReport = new Crime({
      user_id: decoded.user_id,
      title,
      description,
      division,
      district,
      crime_time,
      images,
      video,
    });

    // Save the crime report to the database
    const savedReport = await newCrimeReport.save();

    return NextResponse.json(
      {
        crime_id: savedReport._id,
        status: "success",
        message: "Crime report submitted successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reporting crime:", error);
    return NextResponse.json(
      { error: "An error occurred while reporting the crime." },
      { status: 500 }
    );
  }
}
