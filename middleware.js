import jwt from "jsonwebtoken";
import { connectToDB } from "./app/db/connection";
import { User } from "./app/db/models/User";


export async function authenticate(req) {
  try {
    await connectToDB();    
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "Unauthorized", status: 401 };
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return { error: "User not found", status: 401 };
    }
    return { user };
  } catch (error) {
    return { error: "Invalid Token", status: 401 };
  }
}
