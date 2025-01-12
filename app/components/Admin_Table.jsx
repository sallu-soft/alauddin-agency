"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';

import DataTable from 'react-data-table-component';
import { MdDelete, MdEditDocument } from 'react-icons/md';
import { FaFileDownload } from "react-icons/fa";
import TextInput from './TextInput';

const Admin_Table = ({passenger}) => {
    const router = useRouter()
    const [search, setSearch]= useState('');
    const [users, setUsers] = useState([]);
    const [filter, setFilter]= useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
    const [pass, setPass]= useState({
        name:"",
        mofa:"",
        medical:"",
        visa_no:"",
        bio_finger:"",
        bmet_finger:"",
        training:"",
        delivery:"",
        manpower:"",

    });
    
    const user =  typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('user')) : false;
    useEffect(()=>{
        if(!user){
            redirect("/")
        }
    },[]);
    const HandleRemove = async (id) => {
      try {
        const res = await fetch(`/api/passenger/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
  
        if (res.ok) {
          alert("Successfully Deleted Your User");
          router.refresh();
        } else {
          throw new Error("Failed to Delete The User");
        }
      } catch (error) {
        console.log(error);
      }
    };
    const openModal = (id) => {
      setSelectedId(id);
      setIsModalOpen(true);
    };
  
    const confirmDelete = () => {
      if (selectedId) {
        HandleRemove(selectedId);
      }
      closeModal();
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedId(null);
    };
    function formatDate(dateString) {
        if (!dateString) return "";
        let date = new Date(dateString);
        let day = String(date.getUTCDate()).padStart(2, '0');
        let month = String(date.getUTCMonth() + 1).padStart(2, '0');
        let year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    }
    const columns = [
        {
            name: <p className="font-bold text-lg ">Actions</p>,
            selector: row => <div className="flex  items-center gap-2"><Link href={`AdminDashboard/EditEntry/${row._id}`}> <MdEditDocument className="text-2xl  text-green-600 font-bold"/></Link><MdDelete className="text-2xl text-red-800 font-bold cursor-pointer"  onClick={() => openModal(row._id)}/></div>,
            maxWidth:"25px"
        },
        {
            name: <p className="font-bold text-lg min-w-[300px]">Name</p>,
            selector: row => <div className="flex gap-1 flex-col p-1"><h3 className="font-bold text-md uppercase">{row.name}</h3><p className="font-semibold">{row.passport_no}</p><p>{row.gender}</p><p>{formatDate(row?.createdAt)}</p></div>,
            minWidth:"250px",
        },
        
        {
            name: <p className="font-bold text-lg">Country</p>,
            selector: row => row.country,
            wrap:true
        },
        {
            name: <p className="font-bold text-lg">Medical</p>,
            selector: row => {
              const medicalDate = row?.medical_date ? new Date(row.medical_date) : null;
              
              
             
              const now = new Date();

              // Calculate the difference in days
              const timeDiff = now.getTime() - medicalDate?.getTime();
              let daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

              let daysRemaining = 0;
              if (daysElapsed >= 0 && daysElapsed <= 90) {
                  daysRemaining = Math.max(90 - daysElapsed, 0);
              }
             
              
              return (
                  <div className="font-semibold">
                      {row.medical} <br />
                      {medicalDate ? formatDate(medicalDate) : 'N/A'}<br />
                      <span className={daysRemaining<=10?"text-red-700 py-2":"text-green-600 py-2"}>
                      {
                         medicalDate == null
                          ? '' 
                          :  daysRemaining <= 0 
                            ? 'Expired' 
                            : `${daysRemaining} days remaining`
                      }
                      </span>
                    
                     
                  </div>
              );
          },
            wrap:true,
            minWidth:"150px",
        },
        {
            name: <p className="font-bold text-lg">Medical Status</p>,
            selector: row => {
              return  <p className={`${(row?.medical_status=="Unfit")?"p-1 text-md rounded-lg bg-red-600 text-white":"bg-green-700 p-1 text-md text-white rounded-lg"} `}>{row.medical_status}</p>
            },
            wrap:true,
        },
        {
            name: <p className="font-bold text-lg">Mofa</p>,
            selector: row => row?.mofa,
            wrap:true,
        },
        {
            name: <p className="font-bold text-lg">Biometric Finger</p>,
            selector: row => <div className="min-w-[230px] flex gap-1 flex-col p-1"><h3 className="">{row?.bio_finger}</h3><p className={`${(row?.bio_status=="Processing")?"bg-red-600 text-md p-1 w-fit text-white rounded-lg":""}bg-green-700 text-md p-1 w-fit text-white rounded-lg`}>{row?.bio_status}</p></div>,
            wrap:true,
            minWidth:"120px"
        },
        {
            name: <p className="font-bold text-lg">PC No</p>,
            selector: row => row.pc_no,
        },
        {
            name: <p className="font-bold text-lg">Visa/ID No</p>,
            selector: row => <div className="min-w-[230px] flex gap-1 flex-col p-1"><h3 className="">{row.visa_no}</h3><p>{row.id_no}</p></div> ,
            minWidth:"150px",
        },
        {
            name: <p className="font-bold text-lg">Visa Stamping Date</p>,
            selector: row => {
              
            const visaDate = row?.visa_stamping_date ? new Date(row.visa_stamping_date) : null;
            
            let formattedVisaDate = 'N/A';
            if (visaDate && !isNaN(visaDate.getTime())) {
                formattedVisaDate = formatDate(visaDate);
            }else{
                formattedVisaDate = row?.visa_stamping_date;
            }
            
            const now = new Date();

            // Calculate the difference in days
            const timeDiff = now.getTime() - visaDate?.getTime();
            let daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

            let daysRemaining = 'N/A';
            if (daysElapsed >= 0 && daysElapsed <= 90) {
                daysRemaining = Math.max(90 - daysElapsed, 0);
            }

            return (
                <div className="font-semibold">
                    
                    {formattedVisaDate}<br />
                    <span className={daysRemaining<=10?"text-red-700":"text-green-600"}>
                        {daysRemaining === 'N/A' ? '' : `${daysRemaining} days remaining`}
                    </span>
                </div>
            ); 
          },
        },
        {
            name: <p className="font-bold text-lg">Training/BMET Finger</p>,
            selector: row => {
              return <div className="flex flex-col gap-2">
                <p>Training: {row?.training}</p>
                <p>BMET Finger: {row?.bmet_finger}</p>
              </div>
            },
            wrap:true,
            minWidth:"200px"
        },
        
       
        {
            name: <p className="font-bold text-lg">Manpower</p>,
            selector: row => row.manpower ,
            
            wrap: true,
        },
        {
            name: <p className="font-bold text-lg">Delivery</p>,
            selector: row => row.delivery ,
        },
        {
            name: <p className="font-bold text-lg">Payment</p>,
            selector: row => row.payment ,
        },
       
        {
            name: <p className="font-bold text-lg">Message</p>,
            selector: row => row.remark ,
            minWidth:"100px",
            wrap:true,
        },
        {
            name: <p className="font-bold text-lg">Agent</p>,
            selector: row => row.agent ,
            wrap:true,
        },
        {
            name: <p className="font-bold text-lg">Status</p>,
            selector: row => row.status ,
            wrap:true
        },
    ];
    useEffect(()=>{
        const result= passenger.filter((item)=>{
         return item?.name?.toLowerCase().match(search.toLocaleLowerCase()) || item?.passport_no?.toLowerCase().match(search.toLocaleLowerCase()) || item?.agent?.toLowerCase().match(search.toLocaleLowerCase())
        });
        setFilter(result);
    },[search]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/user`);
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
    useEffect(() => {
      // Update the countdown every 24 hours
      const interval = setInterval(() => {
        setDaysRemaining((prev) => Math.max(prev - 1, 0));
      }, 1000 * 60 * 60 * 24); // 24 hours in milliseconds
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        let result = passenger;
    
        if (pass.name) {
          result = result.filter((item) =>
            item.agent?.toLowerCase().includes(pass.name.toLowerCase())
          );
        }
        
        if (pass.medical) {
          result = result.filter((item) =>
            item.medical?.toLowerCase().includes(pass.medical.toLowerCase())
          );
        }
        
        if (pass.mofa) {
          result = result.filter((item) =>
            item.mofa?.toLowerCase().includes(pass.mofa.toLowerCase())
          );
        }
        if (pass.bio_finger) {
          result = result.filter((item) =>
            item.bio_finger?.toLowerCase().includes(pass.bio_finger.toLowerCase())
          );
        }
        if (pass.training) {
          result = result.filter((item) =>
            item.training?.toLowerCase().includes(pass.training.toLowerCase())
          );
        }
        if (pass.visa_no) {
          result = result.filter((item) =>
            item.visa_no?.toLowerCase().includes(pass.visa_no.toLowerCase())
          );
        }
        if (pass.bmet_finger) {
          result = result.filter((item) =>
            item.bmet_finger?.toLowerCase().includes(pass.bmet_finger.toLowerCase())
          );
        }
        if (pass.manpower) {
          result = result.filter((item) =>
            item.manpower?.toLowerCase().includes(pass.manpower.toLowerCase())
          );
        }
        if (pass.delivery) {
          result = result.filter((item) =>
            item.delivery?.toLowerCase().includes(pass.delivery.toLowerCase())
          );
        }
    
        setFilter(result);
      }, [pass, passenger]);
    const extractedData = filter.map((row) => ({
        Name: row?.name,
        Passport: row?.passport_no,
        Gender: row?.gender,
        Country: row?.country,
        Medical: row?.medical,
        Mofa: row?.mofa,
        "Bio Finger": row?.bio_finger,
        "Police Clearance": row?.pc_no,
        "Visa No": row?.visa_no,
        "ID No": row?.id_no,
        "Visa Stamping Date": row?.visa_stamping_date,
        "Training": row?.training,
        "BMET Finger": row?.bmet_finger,
        "Manpower": row?.manpower,
        "Delivery": row?.delivery,
        "Payment": row?.payment,
        "Remark": row?.remark,
    }))
    console.log(pass)
  return (
    <>
    
    <div>
    {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-4 rounded shadow">
            <p>Are you sure you want to delete this passenger?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    <div className="!bg-blue-400 flex gap-2 mx-2 px-3 py-2">
        <TextInput name="name" id="name" type="text" placeholder="Type Name" lebel="Agent Name" list="agents" value={pass.name} handleChange={(e)=>{setPass({...pass,name:e.target.value})}}/>
        <datalist id="agents">
            <option value="" disabled>Select Agent</option>
            {users.map(user => <option key={user._id} value={user.name}>{user.name}</option>)}
        </datalist>
        <TextInput name="medical" id="medical" type="text" placeholder="Type Medical" lebel="Medical" value={pass.medical} handleChange={(e)=>{setPass({...pass,medical:e.target.value})}}/>
        <TextInput name="mofa" id="mofa" type="text" placeholder="Type mofa" lebel="Mofa" value={pass.mofa} handleChange={(e)=>{setPass({...pass,mofa:e.target.value})}}/>
        <TextInput name="manpower" id="manpower" type="text" placeholder="Type manpower" lebel="Manpower" value={pass.manpower} handleChange={(e)=>{setPass({...pass,manpower:e.target.value})}}/>
        
        <div className="mb-4">
        <label className="block  text-white">Training Info</label>
        <select
         name="training" id="training" placeholder="Type Training Info" lebel="Training" value={pass.training} 
          className="form-input mt-1 block w-full p-2 text-black"
          onChange={(e) => {setPass({...pass, training: e.target.value})}}
        >
        <option value="">Select Options</option>
        <option value="Yes" >YES</option>
        <option value="No" >NO</option>
        
        
        </select>
      </div>
        <div className="mb-4">
        <label className="block  text-white">BMET Finger</label>
        <select
         name="bmet_finger" id="bmet_finger" placeholder="Type Info" lebel="bmet_finger" value={pass.bmet_finger} 
          className="form-input mt-1 block w-full p-2 text-black"
          onChange={(e) => {setPass({...pass, bmet_finger: e.target.value})}}
        >
        <option value="">Select Options</option>
        <option value="Yes" >YES</option>
        <option value="No" >NO</option>
        
        
        </select>
      </div>
       
    </div>
    <DataTable

            columns={columns}
            data={filter}
            pagination
            highlightOnHover
            subHeader
            subHeaderComponent={<div className="flex justify-between items-center w-full">                <input type="text" className="w-25 form-control border-2 border-blue-500 p-2 rounded-md" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <CSVLink data={extractedData} filename="hello" className="bg-blue-700 p-3 my-5 text-white flex items-center justify-center w-fit rounded"><FaFileDownload className="mr-2"/> Download</CSVLink>
                </div>

            }
            subHeaderAlign="left"
        />
        </div>
        </>
  )
}

export default Admin_Table