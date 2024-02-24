"use client"

import { Stack, Typography, IconButton } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useTheme } from '@emotion/react';
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import { useState } from 'react';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import HikingOutlinedIcon from "@mui/icons-material/HikingOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { signOut } from "next-auth/react"
import { Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Nav = ({bags, session}) => {

const theme = useTheme()
const router = useRouter()

const sortedBags = bags?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
const filteredBags = sortedBags?.slice(0, 6)


const bagData = filteredBags?.map((bag) => {
      return <Typography onClick={() =>  navigateToBag(bag)} fontSize="14px" variant='span'component="span" mt={1} 
      sx={{ cursor: "pointer" ,"&:hover": { color: theme.green }}} key={bag._id}> <Image src="/backpack.png" alt='backpack' width={14} height={14} style={{marginRight: "3px"}} /> {bag?.name?.length > 10 ? `${bag?.name?.substring(0, 12)}...` : bag?.name}</Typography>
  })


const logOut = () => {
  signOut({ callbackUrl: `/login` })
}


const [expanded, setExpanded] = useState("panel1");

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `2px solid #F2F2F2`,
  borderRight: "0px",
  "&:not(:last-child)": { borderBottom: 0 },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: "2px solid #F2F2F2",
  display: theme.flexBox,
  flexDirection: "column",
  alignItems: theme.start,
  marginLeft: theme.spacing(1),
}));



const handleChange = (panel) => (event, newExpanded) => {
  setExpanded(newExpanded ? panel : false);
};


const navigateToBag = (bag) => {

     localStorage.setItem('tripId', bag.tripId);
     router.push(`/bag?id=${bag._id}`)
}


  return (

    <div className="nav">
    <Stack width={theme.nav.width} display={theme.flexBox} justifyContent={theme.between} height={theme.nav.height} backgroundColor="white"> 
    <Stack position={theme.nav.fixed} height={theme.nav.height} borderRight="1px solid #F2F2F2" width={theme.nav.width}>
    <Stack margin="0 auto" pt={2} pb={2} onClick={() => router.push('/')}>
    <Image src="/logo.png" alt='Light Pack - Planner' width={110} height={70}/>
    </Stack> 

    <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")} onClick={() => router.push("/")}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography fontSize="14px" variant='span' width="100%" sx={{ display: theme.flexBox, justifyContent: theme.between,"&:hover": { color: theme.green }}}>
              Home <WindowOutlinedIcon sx={{ fontSize: "21px" }} />
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography fontSize="14px" variant='span' width={theme.fullWidth} sx={{ display: theme.flexBox, justifyContent: theme.between, "&:hover": { color: theme.green }, }} >
              Bags <HikingOutlinedIcon sx={{ fontSize: "21px" }} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {bagData?.length > 0 ? ( bagData) : ( <Typography component="p" fontSize="13px"> No bags yet</Typography> )}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography fontSize="14px" variant='span' width="100%" sx={{ display: theme.flexBox, justifyContent: theme.between, alignItems: theme.contentCenter, "&:hover": { color: theme.green },}}>
              Articles <PublicOutlinedIcon sx={{ fontSize: "21px" }} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize="13px" variant='span'component="span"> Lorem ipsum </Typography>
            <Typography fontSize="13px" variant='span'component="span"> Lorem ipsum </Typography>
            <Typography fontSize="13px" variant='span'component="span"> Lorem ipsum </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion onClick={() => router.push('/billing')}>
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography fontSize="14px" variant='span' width="100%" sx={{ display: theme.flexBox, justifyContent: theme.between, alignItems: theme.contentCenter, "&:hover": { color: theme.green },}}>
              Settings <SettingsOutlinedIcon sx={{ fontSize: "21px" }} />
            </Typography>
          </AccordionSummary>
        </Accordion>

        <button className='premium'>Upgrade to premium</button>

        {session && session?.user ? (
  <Stack display={theme.flexBox} pb={2} mt={2} alignItems={theme.center}>
    <Tooltip title={<><Typography p={0.2} variant='span' component="h3" fontWeight="300" color="inherit">{session?.user?.name}</Typography>
      <Typography variant='span'p={0.2} component="h3" fontWeight="300" color="inherit">{session?.user?.email}</Typography>
    </>
  }>
     <IconButton sx={{marginBottom: "5px"}}><Image src={session?.user?.image} alt='user' style={{ borderRadius: "100%" }} width={35} height={35} /></IconButton>
     </Tooltip>
      <button className='logout' onClick={logOut}> <LogoutIcon sx={{fontSize: "15px", marginRight: "5px"}}/> Log out</button>
     </Stack>
) : null}
        </Stack>
     

       
    </Stack>
    </div>
  )
}

export default Nav