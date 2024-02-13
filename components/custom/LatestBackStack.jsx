import { Stack } from "@mui/material"
import { styled } from "@mui/system";

const LatestBagStack = styled(Stack)(({ theme }) => ({

    
    boxShadow: theme.latestBagBoxes.boxShadow,
    minHeight: theme.latestBagBoxes.height,
    borderRadius: theme.latestBagBoxes.borderRadius,
    padding: "25px",
    display: "flex",
    justifyContent: "space-between",
    "&:hover": {
        boxShadow: `${theme.latestBagBoxes.hover}`,
      },
}))

export default LatestBagStack


