"use client"
import React, { useEffect, useState } from 'react'
import TextAreaInput from './TextAreaInput';
import TextInput from './TextInput';
import { useRouter } from 'next/navigation';

const EditForm = ({id, Passenger}) => {
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Cote d'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];
  const router = useRouter()
    
  const [users,setUsers] = useState([]);
  
  console.log(Passenger)
  
  const [passenger,setPassenger] = useState(Passenger?.passenger||{});
  console.log(passenger?.status)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/passenger/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch The Passenger");
//         }
//         const data = await response.json();
//         console.log(data)
//         setPassenger(data); // assuming data is an array of users
//       } catch (error) {
//         console.error(error);
//         // Handle error, e.g., set an error state
//       }
//     };

//     fetchData();
//   }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data); // assuming data is an array of users
      } catch (error) {
        console.error(error);
        // Handle error, e.g., set an error state
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,
      passport_no,
      gender,
      country,
      medical,
      medical_status,
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
    } = passenger;
    

    try {
      const res = await fetch(`/api/passenger/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({name,
          passport_no,
          gender,
          country,
          medical,
          medical_status,
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
        }),
      });
      
      if (res.ok) {
        router.push("/AdminDashboard");
        alert("Successfully Updated Your New Passenger")
        router.refresh();
      } else {
        throw new Error("Failed to create a Passenger");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="min-w-lg mx-auto" onSubmit={handleSubmit}>
  <div className="m-4 w-[50%] mx-auto">
  <label className="block text-white">Agent</label>
  <select
    value={passenger?.agent}
    name="agent"
    id="agent"
    className="form-input mt-1 block w-full p-2 text-black"
    onChange={(e) => {setPassenger({...passenger, agent: e.target.value})}}
    required
  >
    <option value="" disabled>Select Agent</option>
    {users.map(user => <option key={user._id} value={user.name}>{user.name}</option>)}
    
  </select>
</div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-2">
      <TextInput name="name" id="name" type="text" placeholder="Type Name" lebel="Name" value={passenger?.name} handleChange={(e)=>{setPassenger({...passenger,name:e.target.value});console.log(passenger)}} />

      <TextInput name="passport_no" id="passport_no" type="text" placeholder="Type Passport No" lebel="Passport No" value={passenger?.passport_no} handleChange={(e)=>{setPassenger({...passenger,passport_no:e.target.value});console.log(passenger)}} />

      {/* <TextInput name="gender" id="gender" type="text" placeholder="Type Gender" lebel="Gender" value={passenger?.gender} handleChange={(e)=>{setPassenger({...passenger,gender:e.target.value});console.log(passenger)}} /> */}
      <div className="mb-4">
        <label className="block  text-white">Gender</label>
        <select
         name="gender" id="gender" placeholder="Type Gender" lebel="Gender" value={passenger?.gender} 
          className="form-input mt-1 block w-full p-2 text-black"
          onChange={(e) => {setPassenger({...passenger, gender: e.target.value})}}
          required
        >
        <option value="" disabled>Select Gender</option>
        <option value="Male" >Male</option>
        <option value="Female" >Female</option>
        
        
        </select>
      </div>

      {/* <TextInput name="country" id="country" type="text" placeholder="Type Country" lebel="Country" value={passenger?.country} handleChange={(e)=>{setPassenger({...passenger,country:e.target.value});console.log(passenger)}} /> */}

      <div className="mb-4">
  <label for="agent" className="block text-white">Country</label>
  
  <input value={passenger?.country}
    name="country"
    list="countrys"
    id="country"
    className="form-input mt-1 block w-full p-2 text-black"
    onChange={(e) => {setPassenger({...passenger, country: e.target.value})}}
    required />
    <datalist id="countrys">
    <option value="" disabled>Select Country</option>
    {countries.map((coun,ind) => <option key={coun} value={coun}>{coun}</option>)}
</datalist>
</div>

      <TextInput name="medical" id="medical" placeholder="Medical Name, Issue and Expire Date" lebel="Medical Information" value={passenger?.medical} handleChange={(e)=>{setPassenger({...passenger,medical:e.target.value});console.log(passenger)}} />
      <TextInput name="medical_date" type="date" id="medical_date" placeholder="" lebel="Medical Date" value={passenger?.medical_date} handleChange={(e)=>{setPassenger({...passenger,medical_date:e.target.value});console.log(passenger)}} />
      <div className="mb-4 w-full">
        <label className="block  text-white">Medical Status</label>
        <select
         name="medical_status" id="medical_status" placeholder="Medical Status" lebel="Medical Status" value={passenger?.medical_status} 
          className="form-input mt-1 block h-10 w-full p-2 text-black"
          onChange={(e) => {setPassenger({...passenger, medical_status: e.target.value})}}
        >
        <option value="" disabled>Select Options</option>
        <option value="Pending" >Pending</option>
        <option value="Fit" >Fit</option>
        <option value="Unfit" >Unfit</option>
        <option value="Interview" >Interview</option>
        
        
        </select>
      </div>
      <TextInput name="mofa" id="mofa" type="date" placeholder="Type Mofa" lebel="Mofa" value={passenger.mofa} handleChange={(e)=>{setPassenger({...passenger,mofa:e.target.value})}} />

      

<div className="flex gap-2">
<TextInput name="bio_finger" id="bio_finger" type="date" lebel="Biometrics Date" value={passenger.bio_finger} handleChange={(e)=>{setPassenger({...passenger,bio_finger:e.target.value})}} />
<div className="mb-4 w-full">
  <label className="block  text-white">Biometrics Status</label>
  <select
   name="bio_status" id="bio_status" placeholder="Biometrics Status" lebel="bio_status" value={passenger.bio_status} 
    className="form-input mt-1 block h-10 w-full p-2 text-black"
    onChange={(e) => {setPassenger({...passenger, bio_status: e.target.value})}}
  >
  <option value="" disabled>Select Options</option>
  <option value="Done" >Done</option>
  <option value="Processing" >Processing</option>
  
  
  </select>
</div>

</div>

<TextInput name="pc_no" id="pc_no" type="text" placeholder="Type Police Clearence" lebel="Police Clearence" value={passenger.pc_no} handleChange={(e)=>{setPassenger({...passenger,pc_no:e.target.value})}} />



<TextInput name="visa_no" id="visa_no" type="text" placeholder="Visa No" lebel="Visa No" value={passenger.visa_no} handleChange={(e)=>{setPassenger({...passenger,visa_no:e.target.value})}} />

<TextInput name="id_no" id="id_no" type="text" placeholder="Type ID No" lebel="ID NO" value={passenger.id_no} handleChange={(e)=>{setPassenger({...passenger,id_no:e.target.value})}} />

<TextInput name="visa_stamping_date" id="visa_stamping_date" type="date" placeholder="Type Visa Stamping Date" lebel="Visa Stamping Date" value={passenger.visa_stamping_date} handleChange={(e)=>{setPassenger({...passenger,visa_stamping_date:e.target.value})}} />



{/* <TextInput name="training" id="training" type="text" placeholder="Type Training Info" lebel="Training Info" value={passenger.training} handleChange={(e)=>{setPassenger({...passenger,training:e.target.value});console.log(passenger)}} /> */}

<div className="mb-4">
  <label className="block  text-white">Training Info</label>
  <select
   name="training" id="training" placeholder="Type Training Info" lebel="training" value={passenger.training} 
    className="form-input mt-1 block w-full p-2 text-black"
    onChange={(e) => {setPassenger({...passenger, training: e.target.value})}}
  >
  <option value="" disabled>Select Options</option>
  <option value="YES" >YES</option>
  <option value="NO" >NO</option>
  
  
  </select>
</div>


<div className="mb-4">
  <label className="block  text-white">BMET Finger Info</label>
  <select
   name="bmet_finger" id="bmet_finger" placeholder="Type BMET Finger Info" lebel="bmet_finger" value={passenger.bmet_finger} 
    className="form-input mt-1 block w-full p-2 text-black"
    onChange={(e) => {setPassenger({...passenger, bmet_finger: e.target.value})}}
  >
  <option value="" disabled>Select Options</option>
  <option value="YES" >YES</option>
  <option value="NO" >NO</option>
  
  
  </select>
</div>

{/* <TextInput name="bmet_finger" id="bmet_finger" type="text" placeholder="Type BMET Finger" lebel="BMET Finger" value={passenger.bmet_finger} handleChange={(e)=>{setPassenger({...passenger,bmet_finger:e.target.value});console.log(passenger)}} /> */}

<TextInput name="manpower" id="manpower" type="date" placeholder="Type Manpower" lebel="Manpower" value={passenger.manpower} handleChange={(e)=>{setPassenger({...passenger,manpower:e.target.value});console.log(passenger)}} />

<TextInput name="delivery" id="delivery" placeholder="Type Delivery Information" type="date" lebel="Delivery Information" value={passenger.delivery} handleChange={(e)=>{setPassenger({...passenger,delivery:e.target.value});console.log(passenger)}} />

<TextAreaInput name="payment" id="payment" placeholder="Type Payment Information" lebel="Payment" value={passenger.payment} handleChange={(e)=>{setPassenger({...passenger,payment:e.target.value});console.log(passenger)}} />

<TextAreaInput name="remark"
id="remark" placeholder="Message"
handleChange={(e)=>{setPassenger({...passenger,remark:e.target.value})}} lebel="Message" />
{/* <TextAreaInput value={passenger.status} name="status" id="status" placeholder="Status"
handleChange={(e)=>{setPassenger({...passenger,status:e.target.value})}} lebel="Status" /> */}

<div className="mb-4 w-full">
  <label className="block  text-white">Status</label>
  <select
   name="status" id="status" placeholder="Status" lebel="Status" value={passenger.status} 
    className="form-input mt-1 block h-10 w-full p-2 text-black"
    onChange={(e) => {setPassenger({...passenger, status: e.target.value})}}
  >
  <option value="" disabled>Select Options</option>
  <option value="Waiting For Embassy" >Waiting For Embassy</option>
  <option value="Waiting For Manpower" >Waiting For Manpower</option>
  <option value="Waiting For Delivery" >Waiting For Delivery</option>
  <option value="Delivery Completed" >Delivery Completed</option>
  
  
  </select>
</div>
      {/* <div className="mb-4">
  <label className="block text-white">Remark</label>
  <textarea
    value={passenger?.remark}
    name={"remark"}
    id={"remark"}
    className="form-input mt-1 block w-full p-2"
    placeholder={"Remark"}
    onChange={(e)=>{setPassenger({...passenger,remark:e.target.value})}}
    required
  />
      </div> */}

     
     
    </div>
    <div className="flex justify-center">
    <button className="bg-blue-500 my-3  text-white px-4 py-2" type="submit">Submit</button></div>
  </form>
  )
}

export default EditForm