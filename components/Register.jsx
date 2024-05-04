"use client"

import { Stack, TextField, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Register = () => {


  const [registerData, setRegisterData] = useState({})
  const [error, setError] = useState("")

  const theme = useTheme()
  const router = useRouter();

  
 


  const handleChange = (event) => {
    let { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };


  const register =  async (e) => {

    e.preventDefault()

    try {
      await axios.post('/api/register', registerData)
      router.push("/login")
  }
   catch (error) {
      setError(error.response.data)
   }

  }

  

  return (
    <Stack display={theme.flexBox} direction="row" justifyContent={theme.end} sx={{overflowY: "hidden"}}>
      
      <div className="login-img">
        <img id="hiking-image" src="/hiking-2.jpg" alt="hiking" width="100%" style={{objectFit: "cover", height:"100vh" }} /> 
        <img id="logo" src="/logo.png" alt="logo" width="110px" height="70" style={{ position: "absolute", top: "16px", left: '35px' }}/> 
      </div>


    <div className="login-content">
    <img id="logo-mobile-login" src="/logo.png" alt="logo" width="90px" height="58" style={{ position: "absolute", top: "25px", left: '25px' }}/> 
    <Stack display={theme.flexBox} justifyContent={theme.center} alignItems="stretch" width="450px">
    <h1 className='login-text'>Register</h1>
    <Typography component="span" variant="span" width="100%" color="gray" mb={4}>
          Welcome! Create your free account
    </Typography>
    <form onSubmit={register} style={{display: "flex", marginBottom: "15px", flexDirection: "column", justifyContent: "center", alignItems: "stretch", borderRadius:"10px"}}>
    <TextField required type="text" label="Username" name='username' onChange={handleChange} sx={{marginBottom: "15px", background: "white", borderRadius: "7px"}} />
    <TextField required type="email" label="Email" name="email" onChange={handleChange} sx={{marginBottom: "15px", background: "white", borderRadius: "7px"}} InputProps={{ style: { border: "2px" } }} />
    <TextField required type="password" label="Password" name='password' onChange={handleChange} sx={{marginBottom: "15px", background: "white", borderRadius: "7px"}} />
    <TextField required type="password" label="Repeat password" name='repeatedPassword' onChange={handleChange} sx={{marginBottom: "15px", background: "white", borderRadius: "7px"}} />
    <button type='submit' className="login-button-regular">Create Account</button>
    <Typography component="span" variant="span" width="100%" color="gray" mb={2}>Already have an account? <Typography onClick={() => router.push("/login")} component="span" variant="span" color="blue" sx={{textDecoration: "underline", cursor: "pointer"}}>Sign in</Typography></Typography>

    { error ? <Stack width="100%" backgroundColor="rgba(255, 0, 0, 0.5)"><Typography p={1.5} color="white">{error}</Typography></Stack> : null }
    </form>

    </Stack>
      </div>
    </Stack>
  )
}

export default Register

