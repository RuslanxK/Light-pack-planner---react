"use client"

import { Stack, Typography, Box, Container, IconButton} from '@mui/material'
import { useRouter } from 'next/navigation';
import { useTheme } from '@emotion/react';
import MonitorWeightOutlinedIcon from "@mui/icons-material/MonitorWeightOutlined";
import DataSaverOffOutlinedIcon from "@mui/icons-material/DataSaverOffOutlined";
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import { PieChart, pieArcLabelClasses} from "@mui/x-charts/PieChart";
import ShareCategory from '../components/ShareCategory'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';

const Share = ({bagData, user}) => {

  const router = useRouter();
  const theme = useTheme()



  const saveLike = () => {

       
  }


  const itemsTotal = bagData?.items?.reduce((acc, item) => acc + item.qty, 0) 

  const categoryWeightsArr = bagData?.totalWeightCategory 
  const categoryPieChartData = bagData?.categories?.map((category) => {  
  const categoryWeight = categoryWeightsArr?.categoriesTotalWeight?.find((item) => item.categoryId === category._id)

  

        return {
          id: category._id,
          value: categoryWeight?.totalWeight || 0 ,
          label: category?.name?.length > 6 ? `${categoryWeight?.totalWeight?.toFixed(2) || 0.00}  - ${category?.name?.substring(0, 6)}...` : `${categoryWeight?.totalWeight?.toFixed(2) || 0.00} - ${category?.name}`
        };
      })
    ;

  const TOTAL = categoryWeightsArr?.categoriesTotalWeight?.map((category) => category.totalWeight).reduce((a, b) => a + b, 0) 
  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };




  return (

    <Container sx={{display: "flex", justifyContent: "center"}} maxWidth={false} disableGutters>
  
    <Box display="flex" flexDirection="row" width={"75%"} minHeight="100vh" height="100%">
    <Stack display={theme.flexBox} justifyContent={theme.start} width={theme.fullWidth} pb={5} pt={5}>

      
       <Stack display={theme.flexBox} flexDirection={theme.row} alignItems={theme.center } boxShadow={'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;'}  backgroundColor={ theme.palette.mode === "dark" ? theme.main.darkColor : "#f2f2f2"}  pl={2} pr={2} pt={1.5} pb={1.5} mb={3} borderRadius="7px">
        <Stack display="flex" direction="row" justifyContent={theme.between} alignItems="center" width="100%">
        <Typography component="h2" variant='span' fontWeight="600" mr={1}>{bagData?.bag?.name}</Typography>
        <Typography>By {user.username}</Typography>
        <IconButton onClick={saveLike}><ThumbUpOffAltOutlinedIcon/></IconButton>
        </Stack>
        </Stack>

        <Typography component="p" variant="p">
          {bagData?.bag?.description}
        </Typography>

        <Stack display={theme.flexBox} direction="row" flexWrap="wrap" justifyContent={theme.center} alignItems={theme.contentCenter}  mt={2} pt={1} pb={1} pr={1} width="fit-content" borderRadius={theme.radius}>
    
        <MonitorWeightOutlinedIcon sx={{  marginRight: "5px" }}/> 
        { bagData?.totalBagWeight > bagData?.bag?.goal ?  <Typography variant="span" component="span" sx={{ fontWeight: "bold", color: "red" }}>{bagData?.totalBagWeight?.toFixed(1)} / {bagData?.bag?.goal}</Typography> :  <Typography variant="span" component="span" sx={{ color: bagData?.totalBagWeight > 0.00 ? theme.green : null }}> {bagData?.totalBagWeight?.toFixed(1)} / {bagData?.bag?.goal}  </Typography>  }
        <NordicWalkingIcon sx={{ marginLeft: "15px", marginRight: "5px" }}/>
        <Typography variant="span" component="span"> { bagData?.worn ? "worn " + bagData?.worn?.toFixed(1) : '0.0' }</Typography>
        <DataSaverOffOutlinedIcon sx={{ marginLeft: "15px", marginRight: "5px" }}/> {itemsTotal} items 
         </Stack> 
   

    { itemsTotal ?  <Stack mb={2}>
      <PieChart margin={{ top: 0, left:0, right:0, bottom: 0}} 
       series={[{
           data: categoryPieChartData,
           faded: {innerRadius: 30, additionalRadius: -15, color: 'gray'},
           highlightScope: { faded: 'global', highlighted: 'item' },
           arcLabel: getArcLabel,
           innerRadius: 35,
           outerRadius: 110,
           paddingAngle: 5,
           cornerRadius: 5,
           startAngle: -180,
           endAngle: 180,
           cx: 180,
           cy: 150,
         },
       ]}
       sx={{[`& .${pieArcLabelClasses.root}`]: { fill: 'white', fontSize: 14, fontWeight: "300"}, visibility: itemsTotal ? "visible" :  "hidden"}}
    
       height={300}
       tooltip={{}}
       slotProps={{ legend: { direction: "column", position: { vertical: "top", horizontal: "center" }}}}
       
       />

      </Stack> : null }


    <div className="categories">

    {bagData.categories.sort((a, b) => a.order - b.order).map((category, index) => (
                 <ShareCategory key={category._id} categoryData={category} items={bagData?.items}  />
                ))}
    
    </div>

    </Stack>
   


    </Box>
    </Container>
  )
}

export default Share