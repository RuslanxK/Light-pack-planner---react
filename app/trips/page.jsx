"use client"

import { Fragment } from 'react'
import InnerTrip from '../../components/InnerTrip'
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { headers } from "next/headers"


const getData = async (id) => {
  const res = await fetch(`${process.env.API_URL}/api/trips/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch trip');
  }
  return res.json()

} 

const getAllTrips = async () => {
  const res = await fetch(`${process.env.API_URL}/api/trips`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch trips');
    }
    return res.json();
} 



const getBags = async () => {

    const res = await fetch(`${process.env.API_URL}/bags`, {
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

  const trips = await getAllTrips()
  const bags = await getBags()

  const allTrips = trips.trips
  
  const data = await getData(id)

  const session = await getServerSession(options)

  return (
   <Fragment>

    <InnerTrip tripData={data} trips={allTrips} bagsData={bags} session={session} />

   </Fragment>

  )
}

export default page