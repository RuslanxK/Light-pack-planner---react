import {IconButton, Stack} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useRouter } from 'next/navigation';

const MobileNav = () => {

 const router = useRouter()

  return (
     <div class="menu-mobile">
         <img src='./logo.png' width="90px" height="58px" class="logo-mobile" onClick={() => router.push('/')} />

         <Stack display="flex" direction="row">
         <IconButton><MenuIcon /></IconButton>
         <IconButton><SettingsOutlinedIcon /></IconButton>
         </Stack>
     </div>
  )
}

export default MobileNav