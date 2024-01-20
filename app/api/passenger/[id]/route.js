import Passenger from "@/Models/passenger";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB;
    const passenger = await Passenger.findOne({_id:id});
    return NextResponse.json({passenger},{status:200});

}

export async function PUT(request, {params}){
    const {id} = params;
    const {name,
        passport_no,
        gender,
        country,
        medical,
        mofa,
        bio_finger,
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
    await connectMongoDB();
    await Passenger.findByIdAndUpdate({ _id: id }, { $set: {name,
        passport_no,
        gender,
        country,
        medical,
        mofa,
        bio_finger,
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
    }}, { new: true })
    // (id ,{name,
    //     passport_no,
    //     gender,
    //     country,
    //     medical,
    //     mofa,
    //     bio_finger,
    //     pc_no,
    //     visa_no,
    //     id_no,
    //     training,
    //     bmet_finger,
    //     visa_stamping_date,
    //     manpower,
    //     delivery,
    //     payment,
    //     remark,
    //     agent,
    //     status
    // });
    return NextResponse.json({message:"Passenger Updated Succesfully"},{status:200});

}

export async function DELETE(request){
    const {id} = await request.json();
    await connectMongoDB();
    const passenger = await Passenger.findByIdAndDelete(id);
    return NextResponse.json(passenger,{message:"The Passenger Has been Deleted"},{status:201});
}