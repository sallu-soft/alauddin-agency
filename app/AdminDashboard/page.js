
import Admin_Table from "../components/Admin_Table";
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
const AdminDashboard = async () => {
  
  const passenger = await getAllPassenger(); 

  
 
  return (
    <div className="m-4 shadow-lg mx-auto w-full">
      <Admin_Table passenger={passenger}/>
    </div>
  );
};

export default AdminDashboard;

