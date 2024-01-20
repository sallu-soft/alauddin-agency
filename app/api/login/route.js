import User from "@/Models/user";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, password } = await request.json();
    await connectMongoDB();

    // Find user by name
    const user = await User.findOne({ name: name }).exec();
    console.log(user)
    if (user) {
      // If passwords are hashed, use bcrypt to compare
      

      if (user.password === password) {
        console.log("ok")
        // User with the provided name and password exists
        return NextResponse.json({
          user:user,
          message: 'All Ok',
          status: 200,
        });
      } else {
        // Password doesn't match
        console.log("Incorrect password")
        return NextResponse.json({
          message: 'Incorrect password',
          status: 401, // Unauthorized
        });
      }
    } else {
      // User not found
      console.log("not found")
     return NextResponse.json( {message: 'User not found', status: 404 });
    }
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error('Error:', error);
    return NextResponse.json({
      message: 'Internal Server Error',
      status: 500,
    });
  }
}