'use client'
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function isAuth(Component) {
  return function IsAuth(props) {
    const auth = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('user')) : false;;

    useEffect(() => {
      if (!auth) {
        return redirect('/');
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}

{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-2">
      <TextInput name="name" id="name" type="text" placeholder="Type Name" lebel="Name" value={passenger?.name} handleChange={(e)=>{setPassenger({...passenger,name:e.target.value});console.log(passenger)}} />

      <TextInput name="passport_no" id="passport_no" type="text" placeholder="Type Passport No" lebel="Passport No" value={passenger?.passport_no} handleChange={(e)=>{setPassenger({...passenger,passport_no:e.target.value});console.log(passenger)}} />

      <TextInput name="gender" id="gender" type="text" placeholder="Type Gender" lebel="Gender" value={passenger?.gender} handleChange={(e)=>{setPassenger({...passenger,gender:e.target.value});console.log(passenger)}} />

      <TextInput name="country" id="country" type="text" placeholder="Type Country" lebel="Country" value={passenger?.country} handleChange={(e)=>{setPassenger({...passenger,country:e.target.value});console.log(passenger)}} />



      <TextAreaInput name="medical" id="medical" placeholder="Medical Name, Issue and Expire Date" lebel="Medical Information" value={passenger?.medical} handleChange={(e)=>{setPassenger({...passenger,medical:e.target.value});console.log(passenger)}} />

      <TextInput name="mofa" id="mofa" type="text" placeholder="Type Mofa" lebel="Mofa" value={passenger?.mofa} handleChange={(e)=>{setPassenger({...passenger,mofa:e.target.value});console.log(passenger)}} />

      <TextInput name="bio_finger" id="bio_finger" type="text" placeholder="Type Biometrics Finger" lebel="Biometrics Finger" value={passenger?.bio_finger} handleChange={(e)=>{setPassenger({...passenger,bio_finger:e.target.value});console.log(passenger)}} />

      <TextInput name="pc_no" id="pc_no" type="text" placeholder="Type Police Clearence" lebel="Police Clearence" value={passenger?.pc_no} handleChange={(e)=>{setPassenger({...passenger,pc_no:e.target.value});console.log(passenger)}} />



      <TextInput name="visa_no" id="visa_no" type="text" placeholder="Visa No" lebel="Visa No" value={passenger?.visa_no} handleChange={(e)=>{setPassenger({...passenger,visa_no:e.target.value});console.log(passenger)}} />

      <TextInput name="id_no" id="id_no" type="text" placeholder="Type ID No" lebel="ID NO" value={passenger?.id_no} handleChange={(e)=>{setPassenger({...passenger,id_no:e.target.value});console.log(passenger)}} />

      <TextInput name="visa_stamping_date" id="visa_stamping_date" type="text" placeholder="Type Visa Stamping Date" lebel="Visa Stamping Date" value={passenger?.visa_stamping_date} handleChange={(e)=>{setPassenger({...passenger,visa_stamping_date:e.target.value});console.log(passenger)}} />



      <TextInput name="training" id="training" type="text" placeholder="Type Training Info" lebel="Training Info" value={passenger?.training} handleChange={(e)=>{setPassenger({...passenger,training:e.target.value});console.log(passenger)}} />

      <TextInput name="bmet_finger" id="bmet_finger" type="text" placeholder="Type BMET Finger" lebel="BMET Finger" value={passenger?.bmet_finger} handleChange={(e)=>{setPassenger({...passenger,bmet_finger:e.target.value});console.log(passenger)}} />

      <TextInput name="manpower" id="manpower" type="text" placeholder="Type Manpower" lebel="Manpower" value={passenger?.manpower} handleChange={(e)=>{setPassenger({...passenger,manpower:e.target.value});console.log(passenger)}} />

      <TextAreaInput name="delivery" id="delivery" placeholder="Type Delivery Information" lebel="Delivery Information" value={passenger?.delivery} handleChange={(e)=>{setPassenger({...passenger,delivery:e.target.value});console.log(passenger)}} />

      <TextAreaInput name="payment" id="payment" placeholder="Type Payment Information" lebel="Payment" value={passenger?.payment} handleChange={(e)=>{setPassenger({...passenger,payment:e.target.value});console.log(passenger)}} />

      <TextAreaInput value={passenger?.remark}
    name="remark"
    id="remark"  placeholder="Message"
    handleChange={(e)=>{setPassenger({...passenger,remark:e.target.value})}} lebel="Message" />
      <TextAreaInput value={passenger?.status}
    name="status"
    id="status" placeholder="Status"
    handleChange={(e)=>{setPassenger({...passenger,status:e.target.value})}} lebel="Status" />
      

     
     
    </div> */}