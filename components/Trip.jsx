
import React, { useState } from 'react'
import { IconButton, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import { useTheme } from '@emotion/react';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import dayjs from 'dayjs';


const Trip = (props) => {

  const [tripHover, setTripHover] = useState(false)

  const router = useRouter()
  const theme = useTheme()

  
  const calculateDaysLeft = (tripData) => {
    if (tripData && tripData.startDate && tripData.endDate) {
      const startDate = dayjs(tripData.startDate);
      const today = dayjs().startOf('day'); 
      const daysLeft = startDate.diff(today, 'day');
      return daysLeft;
    }
    return null;
  };

  const NavigateToInnerTrip = () => {

    router.push(`/trips?id=${props.tripData._id}`)
  }

  return (
    <Stack display={theme.flexBox} justifyContent={theme.between} alignItems={theme.center} onMouseOver={() => setTripHover(true)} onMouseLeave={() => setTripHover(false)} borderRadius={theme.radius} height={theme.trips.height} onClick={NavigateToInnerTrip} boxShadow={theme.boxShadow} sx={{transition: theme.transition, cursor: "pointer", "&:hover": {boxShadow: theme.boxShadowHover}}}>
      <img src={props.tripData.url || './default.png'} width="100%" height={170} alt='trip' priority style={{borderTopLeftRadius: theme.trips.borderLeft, borderTopRightRadius: theme.trips.borderRight, objectFit: theme.cover, filter: calculateDaysLeft(props.tripData) <= 0 ? "grayscale(100%)" : "none" }}/>
      { calculateDaysLeft(props.tripData) <= 0 ? <Typography component="h3" variant='span' position="absolute" marginTop="80px" fontWeight="bold" fontSize="23px" color={theme.main.lightGray}>Traveled</Typography> : null}
      <Typography width="100%" height="25px" pl={3.5} pt={0.8} pb={1} component="span" variant='span' fontSize="14px" display={theme.flexBox} alignItems={theme.center}>{props.tripData.name.length > 36? `${props.tripData.name.substring(0, 36)}..` : props.tripData.name} { tripHover ? <IconButton size='small' sx={{marginLeft: "5px"}}><NearMeOutlinedIcon onClick={NavigateToInnerTrip} sx={{fontSize: "17px"}} /></IconButton> : null }</Typography>
    </Stack>
  )
}

export default React.memo(Trip)