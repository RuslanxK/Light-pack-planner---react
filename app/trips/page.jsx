import { Fragment } from 'react'
import InnerTrip from '../../components/InnerTrip'


const getData = async (id) => {
  const res = await fetch(`${process.env.API_URL}/api/trips/${id}`, {cache: 'no-store'});
  if (!res.ok) {
    throw new Error('Failed to fetch trip');
  }
  return res.json()

} 

const getAllTrips = async () => {
  const res = await fetch(`${process.env.API_URL}/api/trips`, { cache: 'no-store'});
    if (!res.ok) {
      throw new Error('Failed to fetch trips');
    }
    return res.json();
} 


const getBags = async () => {
    const res = await fetch(`${process.env.API_URL}/bags`, { cache: 'no-store'});
    if (!res.ok) {
      throw new Error("Failed to fetch bags");
    }
    return res.json();
  
}


const page = async ({searchParams}) => {

  const id = searchParams.id

  const trips = await getAllTrips()
  const bags = await getBags()

  const allTrips = trips.trips
  
  const data = await getData(id)

  return (
   <Fragment>

    <InnerTrip tripData={data} trips={allTrips} bagsData={bags}  />

   </Fragment>

  )
}

export default page