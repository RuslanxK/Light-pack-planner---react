"use client"

import { Stack, Typography, Button} from "@mui/material"
import { useRouter } from 'next/navigation';
import Lottie from "lottie-web";
import { useEffect, useRef } from "react";
import { useTheme } from '@emotion/react';

export default function NotFound() {

  const router = useRouter();
  const theme = useTheme()

  const container = useRef(null)


  useEffect(() => {

     Lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require('../components/notfound.json')
     })

     return () => { Lottie.destroy() }

  }, []);


    const navigateToHome = () => {
         router.push('/')
    }

  return( 

     <Stack display="flex" justifyContent="flex-end" width="100%" alignItems="center" height="100vh">
      <Typography component="h1" variant="span" fontWeight="bold" fontSize="40px">Sorry</Typography>
      <Typography component="h2" variant="span" fontWeight="400" fontSize="25px">We couldn't find that page.</Typography>
      <Button sx={{marginTop: "10px", backgroundColor: theme.green}} variant="contained" disableElevation onClick={navigateToHome}> Light pack - planner's Home page</Button>
      <div className="container" ref={container}></div>
     </Stack>
  )
      
}