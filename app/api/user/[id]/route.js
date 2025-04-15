
import Passenger from "@/Models/passenger";
import User from "@/Models/user";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";



export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB;
    const user = await User.findOne({_id:id});
    return NextResponse.json({user},{status:200});

}
export async function PUT(request, {params}){
    const {id} = params;
    const {name,
        password,
        phone
    } = await request.json();
    console.log(name)
    await connectMongoDB();
    await User.findByIdAndUpdate({ _id: id }, { $set: {name,
        password,
        phone
    }}, { new: true })
    
    return NextResponse.json({message:"User Updated Succesfully"},{status:200});

}