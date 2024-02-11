import { Stack, Typography, IconButton, Button, TextField} from "@mui/material";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import { useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import { useTheme } from '@emotion/react';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import Item from './Item'
import axios from "axios";
import React from "react";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import MuiPopup from "./custom/MuiPopup";
import CloseIcon from "@mui/icons-material/Close";

const Category = (props) => {

  const theme = useTheme()
  const router = useRouter();

  const [showItems, setShowItems] = useState(true);
  const [isTransitionStarted, startTransition] = useTransition();
  const [removePopupOpen ,setRemovePopupOpen] = useState(false)
  const [updatedCategory, setUpdatedCategory] = useState({name: props?.categoryData?.name})


  const itemsOfCategory = props?.items?.filter((item) => item.categoryId === props.categoryData._id);
  const itemData = itemsOfCategory?.map((item) => <Item key={item._id} itemData={item} />);

  const addItem =  async () => {

    const itemObj = { userId: props.session.user.id, tripId: props.categoryData.tripId, bagId: props.categoryData.bagId, categoryId: props.categoryData._id, name: "new item", wgtOpt: "kg", qty: 1, weight: 0.1}
     
    try {
      await axios.post('/items/new', itemObj);
      startTransition(router.refresh);
    }
     catch (error) {
          console.log(error)
     }
    }

    const openPopup = () => {
       setRemovePopupOpen(true)
    }


    const closePopup = () => {
      setRemovePopupOpen(false);
    };

    const removeCategory = async () => {

        try {
          const categoryId = props.categoryData._id;
          await axios.delete(`/categories/${categoryId}`);
          setRemovePopupOpen(false)
          startTransition(router.refresh);
        }
         catch (error) {
            console.log(error)
         }
    }


    const handleChange = (e) => {
      setUpdatedCategory({ name: e.target.value });
    };
  

     const saveCategoryName = async () => {
       
      try {
        await axios.put(`/categories/${props.categoryData._id}`, updatedCategory);
        startTransition(router.refresh);
      }
       catch (error) {
            console.log(error)
       }
     }


  return (
    <Stack width={theme.category.width} border={theme.category.border} display={theme.flexBox} mb={2} justifyContent={theme.center} borderRadius={theme.radius} backgroundColor="white">

      <Stack display={theme.flexBox} direction="row" justifyContent={theme.between} alignItems={theme.center} pt={1} pb={0.6}>

      <TextField size="small" variant="standard" name="name" sx={{width: "750px", paddingLeft: "13px"}} value={updatedCategory.name} 
      inputProps={{maxLength: 94, style: {fontSize: 14 }}} InputProps={{ disableUnderline: true }} onChange={handleChange} onBlur={saveCategoryName} />
      
  
      <Stack display={theme.flexBox} direction="row" mr={1}>
     <IconButton onClick={openPopup}><DeleteSweepOutlinedIcon fontSize="small" sx={{'&:hover':{color: "red"}}} /> </IconButton> 
      <IconButton onClick={() => setShowItems(!showItems)}>{showItems ? <ExpandLessOutlinedIcon   fontSize="small" /> : <ExpandMoreOutlinedIcon  fontSize="small" />}</IconButton>
       </Stack>

       </Stack>

      {showItems && (
        <Stack borderTop={theme.items.borderTop} sx={{backgroundColor: theme.main.lightGray, borderBottomRightRadius: theme.radius, borderBottomLeftRadius: theme.radius}} pb={2} pt={0.6} width={theme.fullWidth} height={theme.auto}>
          {itemData}

        <Typography variant="span" component="span" pt={1.5} pl={1.5} fontSize="13px" display={theme.flexBox} width="145px" flexDirection="row"
           sx={{cursor: 'pointer', '&:hover': { textDecoration: 'underline', color: theme.green}}} onClick={addItem}>Add new item <PlusOneIcon sx={{ fontSize: "13px", marginLeft: "3px"}}/></Typography>
        </Stack>
      )}



{ removePopupOpen ? <MuiPopup isOpen={removePopupOpen} onClose={closePopup}>
<Stack direction="row" pl={2} pr={2} pt={1} pb={1} justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">

<Stack width="95%">
<Typography variant='span' component="h2" fontWeight="600" mb={1.5}>Delete Category </Typography>
<Typography variant='span' component="span">
   Are you sure you want to delete this category? This action cannot be undone.
   Deleting this category will permanently remove it from the system, and any associated data will be lost.</Typography>
</Stack>

<CloseIcon onClick={closePopup} sx={{cursor: "pointer"}}/>
<Button sx={{padding: "13px", marginTop: "20px", width: "100%", fontWeight: "500", backgroundColor: theme.red, '&:hover': {backgroundColor: theme.redHover}}} variant="contained" onClick={removeCategory} disableElevation>Delete</Button>
</Stack>

</MuiPopup> : null }

    </Stack>
  );
};

export default React.memo(Category);
