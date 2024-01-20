"use client"
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component';
import { MdDelete, MdEditDocument } from 'react-icons/md';

const Admin_Table = ({passenger}) => {
    const router = useRouter()
    const [search, setSearch]= useState('');
    const [filter, setFilter]= useState([]);
    const user =  typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('user')) : false;
    useEffect(()=>{
        if(!user){
            redirect("/")
        }
    },[]);
    const HandleRemove = async (id)=>{
        try {
            const res = await fetch(`/api/passenger/${id}`, {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({id}),
            });
      
            if (res.ok) {
              alert("Successfully Deleted Your User")
              router.refresh();
            } else {
              throw new Error("Failed to Delete The User");
            }
          } catch (error) {
            console.log(error);
          }
    }
    const columns = [
        {
            name: <p className="font-bold text-lg ">Actions</p>,
            selector: row => <div className="flex  items-center gap-2"><Link href={`AdminDashboard/EditEntry/${row._id}`}> <MdEditDocument className="text-2xl  text-green-600 font-bold"/></Link><MdDelete className="text-2xl text-red-800 font-bold cursor-pointer" onClick={()=>HandleRemove(row._id)}/></div>,
            maxWidth:"25px"
        },
        {
            name: <p className="font-bold text-lg min-w-[300px]">Name</p>,
            selector: row => <div className="flex gap-1 flex-col p-1"><h3 className="font-bold text-md uppercase">{row.name}</h3><p className="font-semibold">{row.passport_no}</p><p>{row.gender}</p></div>,
            minWidth:"250px",
        },
        
        {
            name: <p className="font-bold text-lg">Country</p>,
            selector: row => row.country,
            wrap:true
        },
        {
            name: <p className="font-bold text-lg">Medical</p>,
            selector: row => <div className="font-semibold">{row.medical}</div>,
            wrap:true,
        },
        {
            name: <p className="font-bold text-lg">Mofa</p>,
            selector: row => row.mofa,
            wrap:true,
        },
        {
            name: <p className="font-bold text-lg">Biometric Finger</p>,
            selector: row => row.bio_finger,
            wrap:true,
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
            selector: row => row.visa_stamping_date ,
        },
        {
            name: <p className="font-bold text-lg">Training</p>,
            selector: row => row.training ,
        },
        {
            name: <p className="font-bold text-lg">BMET Finger</p>,
            selector: row => row.bmet_finger ,
        },
       
        {
            name: <p className="font-bold text-lg">Manpower</p>,
            selector: row => row.manpower ,
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
  return (
    <DataTable

            columns={columns}
            data={filter}
            pagination
            highlightOnHover
            subHeader
            subHeaderComponent={
                <input type="text" className="w-25 form-control border-2 border-blue-500 p-2 rounded-md" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)}/>

            }
            subHeaderAlign="left"
        />
  )
}

export default Admin_Table