import React from 'react'
import User_Table from '../components/User_Table';
const getAllPassenger = async () => {
  try {
      const response = await fetch(`${process.env.API_URL}/api/passenger`,{cache:'no-store'});

      if (!response.ok) {
          if (response.status === 404) {
              // Handle 404 error, for example, by returning an empty array or showing a user-friendly message.
              return [];
          }

          throw new Error(`Failed to fetch passengers. Status: ${response.status}`);
      }

      const passengers = await response.json();
      return passengers;
  } catch (error) {
      console.error('Error fetching passengers:', error.message);
      throw error;
  }
};
const UserDashboard = async () => {
  // const auth = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('user')) : false;
  
  const passenger = await getAllPassenger();
//   if(!passenger) {
//     redirect("/");
// }
  return (
    <div>
      <User_Table passenger={passenger}/>
    </div>
  )
}

export default UserDashboard