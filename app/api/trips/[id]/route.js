import trip from '../../../../models/trip';
import bag from '../../../../models/bag';
import category from '../../../../models/categories'
import item from '../../../../models/item'
import { connectToDB } from '../../../../utils/database';
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { options } from '../../auth/[...nextauth]/options';


export const GET = async (req, {params}) => {
  

  try {
    await connectToDB();

    const session = await getServerSession(options)
    const userId = session.user.id
    
    const foundTrip = await trip.findOne({ _id: params.id, creator: userId });;
    const bagsOfTheTrip = await bag.find({tripId: params.id, creator: userId})

    if (!foundTrip) {
      return new NextResponse('Trip not found', { status: 404 });
    }

    const tripWithBags = {
      trip: foundTrip,
      bags: bagsOfTheTrip,
    };

    return new NextResponse(JSON.stringify(tripWithBags), {status: 200})
  } catch (error) {
    return new NextResponse('Failed to fetch trip', { status: 500 });
  }
};




export const PUT = async (req, { params }) => {
  try {
    await connectToDB();

    const session = await getServerSession(options)
    const userId = session.user.id

    const Trip = await trip.findOne({ _id: params.id, creator: userId });

    if (!Trip) {
      return new NextResponse('Trip not found', { status: 404 });
    }

    const { name, about, distance, startDate, endDate } = await req.json();

    Object.assign(Trip, { name, about, distance, startDate, endDate });

    await Trip.save();
    return new NextResponse('Trip is Updated Successfully', { status: 200 });
  } catch (err) {
    return new NextResponse('Failed to update trip', { status: 500 });
  }
};



export const DELETE = async (req, {params}) => {

    try { 
      await connectToDB();
      await trip.findByIdAndDelete(params.id)
      await bag.deleteMany({tripId: params.id})
      await category.deleteMany({tripId: params.id})
      await item.deleteMany({tripId: params.id})
      return new NextResponse('Trip is Deleted Successfully', { status: 200 });
    }

    catch (error) {
      return new NextResponse('Failed to delete trip', { status: 500 });
    }
}


