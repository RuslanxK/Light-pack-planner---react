"use client"

import { Stack, TextField, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';
import { signIn } from "next-auth/react"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';


const ResetPassword = () => {


  const [loginData, setLoginData] = useState({})
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const theme = useTheme()
  const router = useRouter();

 

  const handleChange = (event) => {
    let { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };


  const handleSubmit =  async (e) => {

     e.preventDefault()
     setIsLoading(true)

     const response = await signIn("credentials", { email: loginData.email, password: loginData.password, redirect: false });

     if (response?.error) {

      setError("Invalid email or password");
      setIsLoading(false)

    } else {
      setError(null);
    }

    if (response.url && response.ok === true) {
      
      setTimeout(() => {

        setIsLoading(false)
        router.push("/");
        router.refresh()
       
        
      }, 1500);
    
    
    }
  }
  

  return (
    <Stack display={theme.flexBox} direction="row" justifyContent={theme.end} sx={{overflowY: "hidden"}}>
      
      <div className="login-img">
        <img id="hiking-image" src="/hiking-3.jpg" alt="hiking" width="100%" style={{objectFit: "cover", height:"100vh" }} /> 
        <img id="logo" src="/logo.png" alt="logo" width="110px" height="70" style={{ position: "absolute", top: "16px", left: '35px' }}/> 
      </div>


    <div className="login-content">
    <img id="logo-mobile-login" src="/logo.png" alt="logo" width="90px" height="58" style={{ position: "absolute", top: "25px", left: '25px' }}/> 
    <Stack display={theme.flexBox} justifyContent={theme.center} alignItems="stretch" width="450px">
    <h1 className='login-text'>Forgot Password</h1>
    <Typography component="span" variant="span" mb={4} width="100%" color="gray">
          Enter the email address you used to create the account, and we will email you instructions to reset your password
    </Typography>
    <form onSubmit={handleSubmit}>
    <div style={{display: "flex", marginBottom: "15px", flexDirection: "column", justifyContent: "center", alignItems: "stretch", borderRadius:"10px"}}>
    
    <TextField type="email" label=" Enter Email" name="email" onChange={handleChange} sx={{marginBottom: "15px", background: "white", borderRadius: "7px"}} />
    <button type='submit' className="login-button-regular" style={{display: "flex", justifyContent: "center"}}>Log in { isLoading ? <CircularProgress color="inherit" size={20} sx={{marginLeft: "15px"}} /> : null }</button>
    <Typography component="span" variant="span" width="100%" color="gray" sx={{cursor: "pointer"}}  mb={2}>Remember password? <Typography onClick={() => router.push("/login")} component="span" variant="span" color="#2d7fb5" sx={{cursor: "pointer"}}>Login</Typography></Typography>

    </div>
    </form>


    { error ? <Alert severity="error">{error}</Alert> : null }

    </Stack>
    

      </div>
    </Stack>
  )
}

export default ResetPassword

