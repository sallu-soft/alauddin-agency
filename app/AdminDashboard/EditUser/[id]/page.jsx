
import EditForm from '@/app/components/EditForm';
import EditUserForm from '@/app/components/EditUserForm';
import { redirect } from 'next/navigation';

const getUserById = async (id) => {
    try{
      const res = await fetch(`${process.env.API_URL}/api/user/${id}`,{
        cache: "no-store",
      });
  
      if(!res.ok){
        throw new Error("Failed to fetch Single User");
      }
      return res.json();
    }catch(e){
      console.log(e)
    }
  }
const EditUser =async ({params}) => {
    const {id} = params;
    const user = await getUserById(id);
    console.log(user)
  //   const auth = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('user')) : false;
  //   if(!auth) {
  //     redirect("/");
  // }
    
  
  return (


                <div className="px-4">
                <EditUserForm id={id} users={user} />
</div>
  )
}

export default EditUser