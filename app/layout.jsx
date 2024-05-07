
import { Poppins } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider} from "@mui/material";
import { theme } from "../components/custom/theme.jsx";
import Providers from '../components/Providers'
import '../style.css'
import Nav from "../components/Nav.jsx";
import { Stack } from '@mui/material'
import { getServerSession } from 'next-auth';
import {options} from './api/auth/[...nextauth]/options'


const poppins = Poppins({
  weight: ['200', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: "swap"
})

export const metadata = {
  title: "Light pack - Planner",
  description: "Organize your backpack with ease",
};





export default async function RootLayout({ children }) {


  const session = await getServerSession(options)


  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </head>
      <Providers>
      <ThemeProvider theme={theme}>
         <body className={poppins.className} suppressHydrationWarning={true}>
          <AppRouterCacheProvider>
            <Stack display="flex" flexDirection="row">
            <Nav session={session} />
           {children}
           </Stack>
          </AppRouterCacheProvider>
          </body>
          </ThemeProvider>
          </Providers>
    </html>
  );
}
