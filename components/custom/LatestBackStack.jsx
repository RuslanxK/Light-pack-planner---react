import { Stack } from "@mui/material"
import { styled } from "@mui/system";

const LatestBagStack = styled(Stack)(({ theme }) => ({

    width: theme.latestBagBoxes.width,
    boxShadow: theme.latestBagBoxes.boxShadow,
    minHeight: theme.latestBagBoxes.height,
    borderRadius: theme.latestBagBoxes.borderRadius,
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "25px",
    padding: "25px",
    display: "flex",
    justifyContent: "space-between",
    "&:hover": {
        boxShadow: `${theme.latestBagBoxes.hover}`,
      },
}))

export default LatestBagStack


