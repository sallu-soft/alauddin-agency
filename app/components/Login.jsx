"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Login = () => {
    const router = useRouter()
    const url = `/api/login`;
          console.log(url)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, password} = user;
        if (!user.name || !user.password) {
          alert("Name and Passwordare required.");
          return;
        }
     
        try {
          const url = `/api/login`;
          console.log(url)
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ name:name, password:password}),
          });
          const data = await res.json();

    console.log(data);
          if (data.status === 200) {
             alert("Successfully Logged In!!");
            //  localStorage.setItem('user', JSON.stringify(data.user));
             typeof window !== "undefined" ? window.localStorage.setItem('user', JSON.stringify(data.user)) : false;
            if(data.user.role==="admin"){
              router.push("/AdminDashboard")
            }else{
              router.push("/UserDashboard")
            }
          } else {
            alert("Invalid Credentials")
            throw new Error("Opps! Invalid Credentials.");
          }
        } catch (error) {
          console.log(error);
        }
      };
    const [user,setUser] = useState({
        name:"",
        password:"",
      })
  return (
    <div className="flex min-h-fit max-w-fit flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-xl rounded-lg border-2 border-pink-600">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  type="password"
                  autoComplete="current-password"
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Login