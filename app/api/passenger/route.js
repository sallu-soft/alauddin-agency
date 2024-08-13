
import Passenger from "@/Models/passenger";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";


export async function POST(request){
    const {
        name,
        passport_no,
        gender,
        country,
        medical,
        medical_date,
        mofa,
        bio_finger,
        bio_status,
        pc_no,
        visa_no,
        id_no,
        training,
        bmet_finger,
        visa_stamping_date,
        manpower,
        delivery,
        payment,
        remark,
        agent,
        status
    } = await request.json();

    console.log(medical_date, bio_status)
    await connectMongoDB();
    const passenger = await Passenger.create({name,
        passport_no,
        gender,
        country,
        medical,
        medical_date,
        mofa,
        bio_finger,
        bio_status,
        pc_no,
        visa_no,
        id_no,
        training,
        bmet_finger,
        visa_stamping_date,
        manpower,
        delivery,
        payment,
        remark,
        agent,
        status
        
    })
    return NextResponse.json(passenger,{message:"Passenger Created successfully"},{status:201});
}

export async function GET(){
    await connectMongoDB();
    const passenger = await Passenger.find();
    return NextResponse.json(passenger,{status:201});
}