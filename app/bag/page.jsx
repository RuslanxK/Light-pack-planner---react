import { Fragment } from 'react'
import InnerBag from '../../components/InnerBag'
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { headers } from "next/headers"


const getData = async (id) => {

  const res = await fetch(`${process.env.API_URL}/bags/${id}`, {
    method: 'GET',
    cache: 'no-store',
    headers: headers()
  });
  if(!res.ok) {

      throw new Error("Failed to fetch bag")
  }
  return res.json()

} 

const getItems = async () => {
  const res = await fetch(`${process.env.API_URL}/items`,  {
    method: 'GET',
    cache: 'no-store',
    headers: headers()
  });

  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }

  return res.json()
};


const getBags = async () => {

  const res = await fetch(`${process.env.API_URL}/bags`, {
    headers: headers(),
    method: 'GET',
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error("Failed to fetch bags");
  }
  return res.json();

}


const page = async ({searchParams}) => {

  const id = searchParams.id
  const session = await getServerSession(options)
  const data = await getData(id)
  const items = await getItems()
  const bags = await getBags()

  return (
   <Fragment>
    <InnerBag bagData={data} items={items} bags={bags} session={session} />
   </Fragment>

  )
}

export default page