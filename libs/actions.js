
 
export const getAllUsers = async () => {
    const passenger = await fetch(`${process.env.API_URL}/api/passenger`);
    return passenger.json();
}