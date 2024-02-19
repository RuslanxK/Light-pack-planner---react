import {IconButton, Stack} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const MobileNav = ({session, bags}) => {

  const [openHamburger, setOpenHamburger] = useState(false)

 const router = useRouter()

  return (
     <div class="menu-mobile">
         <img src='./logo.png' width="90px" height="58px" class="logo-mobile" onClick={() => router.push('/')} />

         <Stack display="flex" direction="row">
         <IconButton onClick={() => setOpenHamburger(!openHamburger)}><MenuIcon /></IconButton>

         {openHamburger ? <Stack backgroundColor="white" mt={6} right="35px" zIndex="99" position="absolute" width="250px" height="350px" borderRadius="7px" boxShadow="rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;">


           

         </Stack> : null }
       
         </Stack>
     </div>
  )
}

export default MobileNav