"use client"

import { Stack, TextField, Typography } from '@mui/material'
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

  
const handleSubmit = (e) => {

    e.preventDefault()
    const data = new FormData(e.currentTarget)

    console.log(data)
}

  return (
    <Stack display={theme.flexBox} direction="row" justifyContent={theme.end} sx={{overflowY: "hidden"}}>
      
      <div class="login-img">
        <img id="hiking-image" src="/hiking.png" alt="hiking" width="100%" style={{objectFit: "cover", height:"100vh" }} /> 
        <img id="logo" src="/logo.png" alt="logo" width="110px" height="70" style={{ position: "absolute", top: "16px", left: '25px' }}/> 
      </div>

    <div class="login-content">
    <Stack display={theme.flexBox} justifyContent={theme.center} alignItems={theme.center}>

    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor:"rgba(255,255,255, 0.4)", padding: "30px", borderRadius:"10px"}}>
    <Typography component="h1" variant='span' fontSize="2.2em" mb={3}>Log in to Planner</Typography>
    <TextField label="Email" name="email" sx={{marginBottom: "15px", background: "white", width: "300px", borderRadius: "7px"}} />
    <TextField label="Password" name='password' sx={{marginBottom: "15px", background: "white", width: "300px", borderRadius: "7px"}} />
    <button class="login-button-regular">Log in</button>

    <button className='login-button' onClick={loginWithGoogle}> <Stack width="220px" margin="0 auto" display={theme.flexBox} direction="row" alignItems={theme.center}><img src="/google.png" width="23px" style={{marginRight: "15px"}} alt="google" />Continue with Google </Stack></button>
    <button className='login-button' onClick={loginWithFacebook}> <Stack width="220px" margin="0 auto" display={theme.flexBox} direction="row" alignItems={theme.center}><img src="/facebook.png" width="20px" style={{marginRight: "15px"}} alt="google" />Continue with Facebook </Stack></button>

    </form>

    </Stack>
      </div>
    </Stack>
  )
}

export default Login

