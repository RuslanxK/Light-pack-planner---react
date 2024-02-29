import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';


const Loading = () => {
  return (
    <Box sx={{  width: '100%', height: "100vh" }}>
    <LinearProgress />
    </Box>
  )
}

export default Loading