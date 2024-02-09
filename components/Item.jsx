"use client"

import { Stack, TextField, Select, MenuItem, IconButton, Typography, Button} from '@mui/material'
import LinkIcon from '@mui/icons-material/Link';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme } from '@emotion/react';
import React, { useState, useTransition  } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import MuiPopup from './custom/MuiPopup';
import CloseIcon from "@mui/icons-material/Close";


const Item = (props) => {


  const [isTransitionStarted, startTransition] = useTransition();
  const [popupOpen, setPopupOpen] = useState(false)
  const [removePopupOpen ,setRemovePopupOpen] = useState(false)
  const [itemData, setItem] = useState({ _id: props.itemData._id, tripId: props.itemData.tripId, bagId: props.itemData.bagId, categoryId: props.itemData.categoryId, name: props.itemData.name,
    priority: props.itemData.priority, description: props.itemData.description, qty: +props.itemData.qty, weight: +props.itemData.weight || 0.1, wgtOpt: props.itemData.wgtOpt, link: props.itemData.link, worn: props.itemData.worn});

    const theme = useTheme()
    const router = useRouter();

    const openRemovePopupOpen = () => {
      setRemovePopupOpen(true)
   }

   const closePopup = () => {
     setRemovePopupOpen(false);
     setPopupOpen(false)
     
   };

    const saveItemData =  async () => {

      try {
        await axios.put(`/items/${itemData._id}`, itemData);
        startTransition(router.refresh);
      }
       catch (error) {
            console.log(error)
       }
    };

    

    const handleChange = (event) => {
      let { name, value } = event.target;
      setItem({ ...itemData, [name]: value });
    };



    const updateAsWorn =  async () => {

      setItem((prevItemData) => ({ ...prevItemData, worn: !prevItemData.worn }));

      try {
        await axios.put(`/items/${itemData._id}`, { ...itemData, worn: !itemData.worn });
        startTransition(router.refresh);
      }
       catch (error) {
            console.log(error)
       }
    };


    const duplicateItem = async () => {

    const duplicatedItem = { ...itemData };
    delete duplicatedItem._id;
    try {
      await axios.post('/items/new', duplicatedItem);
      startTransition(router.refresh);
    }
     catch (error) {
          console.log(error)
     }
      
    }

    const removeItem = async () => {
      try {
        await axios.delete(`/items/${props.itemData._id}`);
        startTransition(router.refresh);
      }
       catch (error) {
            console.log(error)
       }
    }


    const saveLink = async (e) => {
      
      e.preventDefault()
      try {
        await axios.put(`/items/${itemData._id}`, itemData);
        setPopupOpen(false)
        startTransition(router.refresh);
      }
       catch (error) {
            console.log(error)
       }
    }


  return (

    
    <Stack pl={1.5} pr={1.5} pt={0.5} sx={{'&:hover': {backgroundColor: theme.main.lightestGray}}}>
    
      <form onSubmit={saveItemData}>

      <Stack display={theme.flexBox} flexDirection="row" justifyContent={theme.between} alignItems={theme.center}>

      <TextField size='small' variant='standard' name='name' label="name" sx={{ width: '50%', marginRight: "15px", borderBottom: "1px solid #C0C0C0"}} value={itemData.name} InputLabelProps={{ style : {fontSize: 13, color: "black"}}} InputProps={{disableUnderline: true}} inputProps={{style: {fontSize: 13, color: "#404040"}}} onChange={handleChange} onBlur={saveItemData}/>
      <TextField size='small' variant='standard' name='description' label='note' sx={{width: '100%', marginRight: "15px", borderBottom: "1px solid #C0C0C0"}} value={itemData.description} InputLabelProps={{ style : {fontSize: 13, color: "black"}}} inputProps={{style: {fontSize: 13, color: "#404040"}}} InputProps={{disableUnderline: true}}  onChange={handleChange} onBlur={saveItemData} />
      <TextField size='small' variant='standard' type='number' name='qty' label="qty" sx={{width: '10%', marginRight: "15px", borderBottom: "1px solid #C0C0C0"}} value={itemData.qty} onChange={handleChange} InputLabelProps={{ style : {fontSize: 13, color: "black"}}} InputProps={{disableUnderline: true}} inputProps={{ min: 1, max: 99, style: {fontSize: 13, color: "#404040"} }} onBlur={saveItemData}/>
      <TextField size='small' variant='standard' type='number' name='weight' label='weight' sx={{width: '12%', marginRight: "15px", borderBottom: "1px solid #C0C0C0"}} value={itemData.weight} onChange={handleChange} InputLabelProps={{ style : {fontSize: 13, color: "black"}}} InputProps={{disableUnderline: true}} inputProps={{ min: 0.1, max: 99, style: {fontSize: 13, color: "#404040"} }} onBlur={saveItemData} />
      <Select size='small' variant='outlined' name='wgtOpt' value={itemData.wgtOpt} sx={{width: '10%', marginRight: "15px", fontSize: "13px", boxShadow: "none"}} onChange={handleChange} onBlur={saveItemData}>  
       <MenuItem sx={{fontSize: "13px"}} value="kg">kg</MenuItem>
       <MenuItem sx={{fontSize: "13px"}} value="lb">lb</MenuItem>
       <MenuItem sx={{fontSize: "13px"}} value="g">g</MenuItem>
       <MenuItem sx={{fontSize: "13px"}} value="oz">oz</MenuItem>
      </Select>
      <Select size='small' variant='outlined' name='priority' sx={{width: '15%', fontSize: "13px",  marginRight: "10px"}} value={itemData.priority} onChange={handleChange} onBlur={saveItemData}>  
       <MenuItem sx={{fontSize: "13px"}} value="low">Low priority</MenuItem>
       <MenuItem sx={{fontSize: "13px"}} value="medium">Med priority</MenuItem>
       <MenuItem sx={{fontSize: "13px"}} value="high">High priority</MenuItem>
      </Select>


    <Stack display={theme.flexBox} flexDirection="row">
    <IconButton onClick={updateAsWorn} ><NordicWalkingIcon sx={{fontSize: "14px",  color: itemData.worn ? theme.green : null,  '&:hover':{color: theme.green}}} /> </IconButton>
    <IconButton onClick={duplicateItem}><ContentCopyIcon sx={{fontSize: "13px", '&:hover':{color: theme.green}}}  /> </IconButton>
    <IconButton onClick={() => setPopupOpen(true)}><LinkIcon sx={{fontSize: "15px", color: itemData.link ? "blue" : null, '&:hover':{color: "blue"}}} /> </IconButton>
    <IconButton onClick={openRemovePopupOpen}><DeleteOutlineOutlinedIcon sx={{fontSize: "15px", '&:hover':{color: "red"}}} /> </IconButton>
    </Stack> 

      </Stack>
    
        </form>

      


      { removePopupOpen ? <MuiPopup isOpen={removePopupOpen} onClose={closePopup}>
       <Stack direction="row" pl={2} pr={2} pt={1} pb={1} justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">

      <Stack width="95%">
      <Typography variant='span' component="h2" fontWeight="600" mb={1.5}>Delete item</Typography>
      <Typography variant='span' component="span">
       Are you sure you want to delete this item? This action cannot be undone.
       Deleting this item will permanently remove it from the system, and any associated data will be lost.</Typography>
      </Stack>

<CloseIcon onClick={closePopup} sx={{cursor: "pointer"}}/>
<Button sx={{padding: "13px", marginTop: "20px", width: "100%", fontWeight: "500", backgroundColor: theme.red, '&:hover': {backgroundColor: theme.redHover}}} variant="contained" onClick={removeItem} disableElevation>Delete</Button>
</Stack>

</MuiPopup> : null }



{popupOpen ? <MuiPopup isOpen={popupOpen} onClose={closePopup}>

   <form onSubmit={saveLink}>
        <Stack p={1}>
          <Stack flex={1} direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h3" marginBottom="10px">
              Add a link for this item
            </Typography>
            <CloseIcon onClick={closePopup} />
          </Stack>
          <TextField
            size="small"
            name="link"
            label="Link"
            variant="outlined"
            value={itemData.link}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          
          <Button type="submit" sx={{padding: "9px", width: "100%", fontWeight: "500", backgroundColor: theme.green}} variant="contained" disableElevation>Save</Button>
        </Stack>
      </form>


</MuiPopup> : null }



        </Stack>

  )
}

export default React.memo(Item)