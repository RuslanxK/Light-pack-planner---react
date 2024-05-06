import { Fragment } from 'react'
import Articles from '../../components/Articles';



const getArticles = async () => {

    const res = await fetch(`${process.env.API_URL}/api/articles`, { cache: 'no-store'});
    if (!res.ok) {
      throw new Error("Failed to fetch bags");
    }
       return res.json();
  }
  


  const page = async () => {

    const articles = await getArticles()
  
  
    return (
     <Fragment>
  
      <Articles articles={articles} />
  
     </Fragment>
  
    )
  }
  
  export default page