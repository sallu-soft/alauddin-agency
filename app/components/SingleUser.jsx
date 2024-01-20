"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdDeleteForever } from 'react-icons/md'

const SingleUser = ({item}) => {
    const router = useRouter()
    const handleRemove = async (id) => {
   
   

        try {
          const res = await fetch(`/api/user`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({id}),
          });
    
          if (res.ok) {
            router.push("/AdminDashboard/Users");
            alert("Successfully Deleted Your User")
            router.refresh();
          } else {
            throw new Error("Failed to Delete The User");
          }
        } catch (error) {
          console.log(error);
        }
    
    }
  return (
    <tr key={item._id}>
                            
    <td className="p-2">
        <div className="font-medium text-gray-800">{item.name}</div>
    </td>
    <td className="p-2">
        <div className="text-left">{item.phone}</div>
    </td>
    <td className="p-2">
        <div className="text-left font-medium text-green-500">{item.password}</div>
    </td>
    <td className="p-2">
        <div className="flex justify-center">
            <button onClick={()=>handleRemove(item._id)}> 
            <MdDeleteForever className="font-bold text-2xl text-red-800"/>
            </button>
            {/* <button onClick={()=>handleRemove(item._id)}> 
            <MdDeleteForever className="font-bold text-2xl text-red-800"/>
            </button> */}
        </div>
    </td>
</tr>   
  )
}

export default SingleUser