import { Fragment } from 'react'
import InnerBag from '../../components/InnerBag'


export const fetchCache = 'force-no-store'

const getData = async (id) => {

  const res = await fetch(`${process.env.API_URL}/bags/${id}`, { cache: 'no-store'});
  if(!res.ok) {

      throw new Error("Failed to fetch bag")
  }
  return res.json()

} 

const getItems = async () => {
  const res = await fetch(`${process.env.API_URL}/items`,  { cache: 'no-store'});

  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }
  return res.json()
};


const getBags = async () => {

  const res = await fetch(`${process.env.API_URL}/bags`, { method: 'GET'});
  if (!res.ok) {
    throw new Error("Failed to fetch bags");
  }
  return res.json();

}


const page = async ({searchParams}) => {

  const id = searchParams.id

  const data = await getData(id)
  const items = await getItems()
  const bags = await getBags()

  return (
   <Fragment>
    <InnerBag bagData={data} items={items} bags={bags} />
   </Fragment>

  )
}

export default page