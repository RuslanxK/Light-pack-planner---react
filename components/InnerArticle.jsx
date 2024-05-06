"use client"

import React from 'react'
import Nav from './Nav'
import { Container, Typography, Stack, Button } from '@mui/material'
import { useTheme } from '@emotion/react';
import { useRouter } from 'next/navigation';


const InnerArticle = ({articleData}) => {

    const theme = useTheme()
    const router = useRouter()

  return (
    <Container sx={{display: theme.flexBox}} maxWidth={false} disableGutters>

        <Nav />


        <Stack display={theme.flexBox} justifyContent={theme.start} width={theme.trips.width} pb={7} backgroundColor={theme.main.lightestGray} minHeight="100vh">

        <img src={`${process.env.NEXT_PUBLIC_ARTICLE_URL}/${articleData.imageKey}`} height="500px" style={{objectFit: "cover"}} alt='article' />

        <div className="main-info">

        <Stack pr={5} mb={3}>
        <Typography component="h1" variant='span' pt={1} mb={2}>{articleData.title}</Typography>
        <Typography component="span" variant='span' pt={1} lineHeight={2}>{articleData.description}</Typography>

        </Stack>

        <Button variant="contained" disableElevation={true} onClick={() => router.push("/articles")}>Back to all articles</Button>

        </div>

        </Stack>
        
        </Container>
  )
}

export default InnerArticle