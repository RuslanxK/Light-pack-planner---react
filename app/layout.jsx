
import { Poppins } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider} from "@mui/material";
import { theme } from "../components/custom/theme.jsx";
import Providers from '../components/Providers'


const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: "swap"
})

import '../style.css'

export const metadata = {
  title: "Light pack - Planner",
  description: "Organize your backpack with ease",
};



export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <Providers>
      <ThemeProvider theme={theme}>
         <body className={poppins.className} suppressHydrationWarning={true}>
          <AppRouterCacheProvider>
           {children}
          </AppRouterCacheProvider>
          </body>
          </ThemeProvider>
          </Providers>
    </html>
  );
}
