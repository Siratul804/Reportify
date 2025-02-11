import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert image to base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    // Call Hugging Face API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: base64Image }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Hugging Face API Error", details: errorData },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log(result); // [ { generated_text: "thief stealing a woman ' s purse" } ]

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
