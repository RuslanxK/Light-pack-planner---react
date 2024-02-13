"use client"

import { Stack, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react';
import { signIn } from "next-auth/react"

const Login = () => {

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const loginWithGoogle = () => {
    signIn('google', { callbackUrl: '/' })
  };

  const loginWithFacebook = () => {
    signIn('facebook', { callbackUrl: '/' })
  };

  


  return (
    <Stack display={theme.flexBox} direction={isMobile ? "column" : "row"} justifyContent={theme.end} height="100vh" width="100%" style={{ backgroundImage:  isMobile ? `url('/hiking.png')` : null , backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      <Stack width={isMobile ? "100vh" : "50vw"}>
       { isMobile ? null : <img id="hiking-image" src="/hiking.png" alt="hiking" width="100%" style={{objectFit: "cover", height:"100vh" }} /> }
        <img id="logo" src="/logo.png" alt="logo" width={ isMobile ?  "90px" : "110px"} height={ isMobile ?  "60" : "70"} style={{ position: "absolute", top: 0, marginLeft: isMobile ? "25px" : "50px", paddingTop: isMobile ? "22px" : "16px" }}/> 
      </Stack>


    <Stack width={ isMobile ? "100vw" : "50vw"} display={theme.flexBox} justifyContent={theme.center} alignItems={theme.center} pb={5}>

    <Stack pl={ isMobile ? 5 : 8} pr={ isMobile ? 5 : 8} pt={ isMobile ? 5 : 10} pb={ isMobile ? 5 : 10} margin="0 auto" borderRadius={"10px"} backgroundColor={ isMobile ? "rgba(255,255,255, 0.3)" : "#f4f4f4"}  display={theme.flexBox} justifyContent={theme.center} alignItems={theme.center}>
    <Typography component="h1" variant='span' fontSize={ isMobile ? "1.8em" : "2.4em"} mb={3} color={isMobile ? "white" : null }>Log in to Planner</Typography>

    <button className='login-button' style={{width: isMobile ? "auto" : null}} onClick={loginWithGoogle}> <Stack width="220px" margin="0 auto" display={theme.flexBox} direction="row" alignItems={theme.center}><img src="/google.png" width="23px" style={{marginRight: "15px"}} alt="google" />Continue with Google </Stack></button>
    <button className='login-button' style={{width: isMobile ? "auto" : null}} onClick={loginWithFacebook}> <Stack width="220px" margin="0 auto" display={theme.flexBox} direction="row" alignItems={theme.center}><img src="/facebook.png" width="20px" style={{marginRight: "15px"}} alt="google" />Continue with Facebook </Stack></button>

    </Stack>
      </Stack>
    </Stack>
  )
}

export default Login

