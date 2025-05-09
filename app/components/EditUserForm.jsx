'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const EditUserForm = ({ id, users}) => {
    const router = useRouter()
    const [user,setUser] = useState(users?.user||{});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,
          password,
          phone
        } = user;
        
    
        try {
            console.log("before")
          const res = await fetch(`/api/user/${id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({name,
              password,
              phone
            }),
          });
          console.log("after")
          if (res.ok) {
            router.push("/AdminDashboard");
            alert("Successfully Updated Your User")
            router.refresh();
          } else {
            throw new Error("Failed to create a User");
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div className="h-[75vh] flex justify-center items-center">
    <div className="flex min-h-fit max-w-fit flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-xl rounded-lg border-2 border-teal-600">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-teal-900">
            Update {user?.name} Info
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} >
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                User Name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setUser({...user,name:e.target.value})}
                  value={user.name}
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block px-2 w-full min-w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                onChange={(e) => setUser({...user,password:e.target.value})}
                value={user.password}
                  id="password"
                  name="password"
                  type="text"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
              </div>
              <div className="mt-2">
                <input
                onChange={(e) => setUser({...user,phone:e.target.value})}
                value={user.phone}
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="current-phone"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
  )
}

export default EditUserForm