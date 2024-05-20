import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box py={3} sx={{backgroundColor:"#CC957B90"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Typography sx={{color:"gray"}} fontSize={"14px"}>Copyright © 2024 by <span style={{color:"#5B92A8", textTransform:"uppercase"}}>Seda Diriker</span></Typography>
    </Box>
  )
}

export default Footer
