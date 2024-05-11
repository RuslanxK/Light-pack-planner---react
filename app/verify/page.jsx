"use client"

import React from 'react';
import { Stack, Typography, Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/navigation';


const page = () => {

  const [progress, setProgress] = React.useState(0);

  const router = useRouter()

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer); // Clear the interval when progress reaches 100%
          router.push('/login'); // Navigate to the login page
          return 100;
        }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 250);

    return () => {
      clearInterval(timer);
    };
  }, [router]); // Watch for changes in the router object

  
  return (
    <Stack display="flex" flexDirection="column" justifyContent="center" alignItems="center" margin="0 auto" height="100vh">

     <Typography component="h1" variant='h1' fontSize="40px" fontWeight="600" mb={2}>Verified</Typography>
     <Typography component="span" variant='span' color="gray">You have successfully verified your account</Typography>
     <Box sx={{ width: '100%', marginTop: "15px" }}>
      <LinearProgress variant="determinate" color="success" value={progress} />
     </Box>

    </Stack>
  )
}

export default page