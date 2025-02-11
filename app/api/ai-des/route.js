import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize Groq SDK with API key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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

    // Validate image type (optional step to avoid unnecessary processing of invalid files)
    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload an image." },
        { status: 400 }
      );
    }

    // Convert image to base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    //binary data will come from front end from atik bhai

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
      console.error("Hugging Face API Error:", errorData);
      return NextResponse.json(
        { error: "Hugging Face API Error", details: errorData },
        { status: response.status }
      );
    }

    const result = await response.json();

    if (!result || !result[0] || !result[0].generated_text) {
      return NextResponse.json(
        { error: "Invalid response from Hugging Face API" },
        { status: 500 }
      );
    }

    const restogrok = result[0].generated_text;

    // Generate description using Groq API
    const aiResponse = await generateDes(restogrok);

    console.log(aiResponse); // Debug: Check Groq response

    return NextResponse.json({ aiResponse }, { status: 200 });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// Corrected function name to generateDes
async function generateDes(input) {
  const systemPrompt = `You are great at writing attention-grabbing descriptions for crime-related posts. Please give me a short, eye-catching description in 1-3 sentences.`;

  try {
    // Request Groq API to generate answers
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate answers for: ${input}` },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.8,
      stream: false,
    });

    const aiResponse = chatCompletion.choices[0].message.content;
    return aiResponse;
  } catch (error) {
    console.error("Error generating description:", error);
    throw new Error("Error generating description from Groq");
  }
}
