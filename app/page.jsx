import { Fragment } from 'react';
import Trips from '../components/Trips'


const getData = async () => {
  
  try {

    const res = await fetch(`${process.env.API_URL}/api/trips`, { cache: 'no-store'});

    const data = await res.json();

    const latestBag = data.latestBag
    const latestBagTotalWeight = data.latestBagTotalWeight
    const totalCategories = data.totalCategories
    const totalItems = data.totalItems

    const picturePromises = data.trips.map(async (trip) => {
      const getPicture = await fetch(`https://api.unsplash.com/search/photos?query=${trip.name}&${process.env.UNSPLASH_CLIENT}`);
      const pictureData = await getPicture.json();

      const picture = pictureData.results && pictureData.results.length > 0 ? pictureData.results[0] : null;
      const url = picture.urls.regular
    
      return { ...trip, url };
    });

    const tripsWithPictures = await Promise.all(picturePromises);

    return { trips: tripsWithPictures, latestBag, latestBagTotalWeight, totalCategories, totalItems};
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
};

}


const getBags = async () => {

  const res = await fetch(`${process.env.API_URL}/bags`, { cache: 'no-store'});
  if (!res.ok) {
    throw new Error("Failed to fetch bags");
  }
  return res.json();

}



const Home = async () => {

  
  const data = await getData()
  const bags = await getBags()


  return (
 
   <Fragment>
   <Trips trips={data} bags={bags} />
   </Fragment>


  )
}




export default Home