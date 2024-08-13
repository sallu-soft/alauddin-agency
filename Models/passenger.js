import mongoose, {Schema} from "mongoose";

const passengerSchema = new Schema({
    name:String,
  passport_no:{
    type:String,
    unique:true,
    required:true,
  },
  gender:String,
  country:String,
  medical:String,
  medical_date:String,
  mofa:String,
  bio_finger:String,
  bio_status:String,
  pc_no:String,
  visa_no:String,
  id_no:String,
  training:String,
  bmet_finger:String,
  visa_stamping_date:String,
  manpower:String,
  delivery:String,
  payment:String,
  remark:String,
  agent:String,
  status:String,
},
{timestamps:true}
)
const Passenger = mongoose.models.Passenger || mongoose.model("Passenger",passengerSchema);

export default Passenger;