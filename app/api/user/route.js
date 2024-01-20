import User from "@/Models/user";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";


export async function POST(request){
    const {name, password, phone} = await request.json();
    await connectMongoDB();
    await User.create({name,password,phone})
    return NextResponse.json({message:"User created successfully"},{status:201});
}

export async function GET(){
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json(users,{status:201});
}
export async function DELETE(request){
    const {id} = await request.json();
    await connectMongoDB();
    const users = await User.findByIdAndDelete(id);
    return NextResponse.json(users,{status:201});
}
