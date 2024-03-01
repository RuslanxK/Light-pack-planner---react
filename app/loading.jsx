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

    <Stack width="400px">
    <LinearProgress color="success" />
    </Stack>
    </Stack>
  )
}

export default Loading