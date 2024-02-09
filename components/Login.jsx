"use client"

import { Stack, Button, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';
import { signIn } from "next-auth/react"

const Login = () => {

  const theme = useTheme()

  const loginWithGoogle = () => {
    signIn('google', { callbackUrl: '/' })
  };

  const loginWithFacebook = () => {
    signIn('facebook', { callbackUrl: '/' })
  };

  


  return (
    <Stack display={theme.flexBox} direction="row">
      <Stack width="50vw">
        <img id="hiking-image" src="/hiking.png" alt="hiking" style={{ height: "100vh", objectFit: "cover"}} />
        <img id="logo" src="/logo.png" alt="logo" width="110px" height="70" style={{ position: "absolute", marginLeft: "50px", paddingTop: "16px" }}/>  
      </Stack>
      <Stack width="50vw" display={theme.flexBox} justifyContent={theme.center} alignItems={theme.center}>

    <Stack pl={8} pr={8} pt={10} pb={10} borderRadius="10px" backgroundColor="#f4f4f4">
    <Typography component="h1" variant='span' fontSize="2.4em" mb={4}>Log in to Planner</Typography>

    <button className='login-button' onClick={loginWithGoogle}> <Stack width="220px" margin="0 auto" display={theme.flexBox} direction="row" alignItems={theme.center}><img src="/google.png" width="23px" style={{marginRight: "15px"}} alt="google" />Continue with Google </Stack></button>
    <button className='login-button' onClick={loginWithFacebook}> <Stack width="220px" margin="0 auto" display={theme.flexBox} direction="row" alignItems={theme.center}><img src="/facebook.png" width="20px" style={{marginRight: "15px"}} alt="google" />Continue with Facebook </Stack></button>

    </Stack>
      </Stack>
    </Stack>
  )
}

export default Login

