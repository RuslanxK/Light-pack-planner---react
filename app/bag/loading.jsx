import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import { Stack } from '@mui/material';
import Image from 'next/image'


const Loading = () => {
  return (
    <Stack display="flex" justifyContent="center" height="100vh"alignItems="center">

    <Stack margin="0 auto" mb={3}>
    <Image src="/logo.png" alt='Light Pack - Planner' width={110} height={70}/>
    </Stack>

    <Stack width="300px">
    <LinearProgress color="success" sx={{padding: "2px", borderRadius: "7px"}}/>
    </Stack>
    </Stack>
  )
}

export default Loading