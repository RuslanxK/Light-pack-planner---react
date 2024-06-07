import React from 'react'
import Share from '../../components/Share'




const getUser = async (id) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/user/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }
    return res.json();

  } catch (error) {
    console.error("Error fetching user:", error);
    return [];
  }
};

const getBag = async (id) => {
  const res = await fetch(`${process.env.API_URL}/api/share/${id}`, { cache: 'no-store'});
  if(!res.ok) {
    console.error()
   }
  return res.json()

}


const page = async ({searchParams}) => {

  const id = searchParams.id

  const bag = await getBag(id)
  const userId = bag.bag.creator
  const user = await getUser(userId)

  
  return (
    <Share bagData={bag} user={user} />
  )
}

export default page