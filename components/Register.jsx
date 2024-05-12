"use client"

import {Fragment, useRef} from "react"
import { Stack, TextField, Typography, Button } from '@mui/material'
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import EditIcon from '@mui/icons-material/Edit';

const Register = () => {


  const [registerData, setRegisterData] = useState({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isHover, setIsHover] = useState(false)

  const theme = useTheme()
  const router = useRouter();
  const usernameRef = useRef(null);
  const emailRef = useRef(null)
  const imageRef = useRef(null)
  const passwordRef = useRef(null)
  const repeatPasswordRef = useRef(null)


  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  
  const handleFileChange = (event) => {
    const { name } = event.target;
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setRegisterData({ ...registerData, [name]: selectedFile });
      setError("");
      setSuccess("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
    setError("");
    setSuccess("");
  };



  const resetFields = () => {
    usernameRef.current.value = null;
    emailRef.current.value = null;
    imageRef.current.value = null;
    passwordRef.current.value = null;
    repeatPasswordRef.current.value = null;
  };


  const register =  async (e) => {
    e.preventDefault()
    if (registerData.image && registerData.image.size > 2 * 1024 * 1024) {
      setError("File size exceeds the maximum limit of 2 MB.");
      return; 
    }

    try {

      setIsLoading(true)

      const data = await axios.post('/api/register', registerData)

      const awsUrl = data.data.signedUrl

      await fetch(awsUrl, {
        method: "PUT",
        body: registerData.image,
        headers: {
  
           "Content-Type": registerData.image.type
        }
    })
      const sendTo = {email: registerData.email, id: data.data.User._id}
      await axios.post("/api/emailVerify", sendTo )
      resetFields();
      setIsLoading(false)
      setSuccess("Account created successfully. Please check your email to verify your account.");
  }
   catch (error) {

     console.log(error)

      setError(error.response.data)
      setIsLoading(false)
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
    <Typography component="span" variant="span" width="100%" color="gray" mb={1} onClick={() => console.log(registerData)}>
          Welcome! Create your free account
    </Typography>
    <form onSubmit={register} style={{display: "flex", marginBottom: "15px", flexDirection: "column", justifyContent: "center", alignItems: "stretch", borderRadius:"10px"}}>


    <Typography component="span" variant="span" width="100%" fontWeight="bold" mb={2}>
       Upload a profile photo
    </Typography>

   <Stack display="flex" direction="row" alignItems="center">


    <Button onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
      component="label"
      disableElevation
      role={undefined}
      variant="outlined"
      sx={{ width: registerData.image ? "auto" : "100%", marginBottom: "5px", padding: registerData.image ? "0px" : "20px", borderStyle: registerData.image ? "none" : "dashed", borderWidth: "2px", '&:hover': { backgroundColor: 'white', borderStyle: registerData.image ? "none" : "dashed", borderWidth: "2px"}}}
     >
      
      { registerData.image ?  <Fragment> <img width="100px" height="100px" style={{borderRadius: "100px", objectFit: "cover"}} src={URL.createObjectURL(registerData.image)} /> { isHover ? <EditIcon sx={{position: "absolute", fill: "white"}} /> : null } </Fragment> : <CloudUploadOutlinedIcon sx={{fontSize: "50px"}}/>}

      <VisuallyHiddenInput type="file" required  name='image' inputRef={imageRef}  accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} />

    </Button>  
     
      </Stack>


    <TextField required inputRef={usernameRef} type="text" label="Username" name='username' onChange={handleChange} sx={{marginBottom: "12px", marginTop: "20px", borderRadius: "7px"}} />
    <TextField required inputRef={emailRef} type="email" label="Email" name="email" onChange={handleChange} sx={{marginBottom: "12px", borderRadius: "7px"}} InputProps={{ style: { border: "2px" } }} />
    <TextField required inputRef={repeatPasswordRef} inputProps={{minLength : 10}} type="password" label="Password" name='password' onChange={handleChange} sx={{marginBottom: "12px", borderRadius: "7px"}} />
    <TextField required inputRef={passwordRef} inputProps={{minLength : 10}} type="password" label="Repeat password" name='repeatedPassword' onChange={handleChange} sx={{marginBottom: "20px", borderRadius: "7px"}} />
    <button type='submit' className="login-button-regular" style={{display: "flex", justifyContent: "center"}}>Create Account   { isLoading ? <CircularProgress color="inherit" size={20} sx={{marginLeft: "15px"}} /> : null }</button>
    <Typography component="span" variant="span" width="100%" color="gray" mb={2}>Already have an account? <Typography onClick={() => router.push("/login")} component="span" variant="span" color="blue" sx={{textDecoration: "underline", cursor: "pointer"}}>Sign in</Typography></Typography>

    { error ?  <Alert severity="error">{error}</Alert> : null }
    {success ?  <Alert severity="success">{success}</Alert>: null }
    </form>

    </Stack>
      </div>
    </Stack>
  )
}

export default Register

