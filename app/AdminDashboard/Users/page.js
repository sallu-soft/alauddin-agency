import SingleUser from "@/app/components/SingleUser";
import { redirect } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
const getAllUsers = async () => {
    try {
        const response = await fetch(`${process.env.API_URL}/api/user`,{cache:'no-store'});

        if (!response.ok) {
            if (response.status === 404) {
                // Handle 404 error, for example, by returning an empty array or showing a user-friendly message.
                return [];
            }

            throw new Error(`Failed to fetch users. Status: ${response.status}`);
        }

        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error;
    }
};
const Users = async () => {
//     const auth = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('user')) : false;
//   if(!auth) {
//     redirect("/");
// }

    const users = await getAllUsers();
  return (
    <section className="h-screen bg-gray-100 px-4 text-gray-600 antialiased">
    <div className="flex flex-col">
        
        <div className="mx-auto mt-2 w-full rounded-sm border border-gray-200 bg-white shadow-lg">
            <header className="border-b border-gray-100 px-5 py-4">
                <div className="font-semibold text-gray-800">Users</div>
            </header>

            <div className="overflow-x-auto p-3">
                <table className="w-full table-auto">
                    <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                        <tr>
                            
                            <th className="p-2">
                                <div className="text-left font-semibold">Name</div>
                            </th>
                            <th className="p-2">
                                <div className="text-left font-semibold">Phone</div>
                            </th>
                            <th className="p-2">
                                <div className="text-left font-semibold">Password</div>
                            </th>
                            <th className="p-2">
                                <div className="text-center font-semibold">Action</div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 text-sm">
                        {
                            users.map((item,ind)=>{
                                return(
                                    <>
                                    <SingleUser item={item}/>
                                       
                                    </>
                                )
                            })
                        }
                       
                       
                    </tbody>
                </table>
            </div>

            
        </div>
    </div>
</section>
  )
}

export default Users