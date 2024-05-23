import { Typography } from '@mui/material'
import React from 'react'

const PageName = ({title}) => {
  return (
    <Typography
        textAlign={"center"}
        variant="h6"
        color={"brown"}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        sx={{
          bgcolor: "#FFE2A880",
          borderTopRightRadius: "10px",
          borderBottomLeftRadius: "10px",
          width: { xs: "75vw", md: "50vw" },
          py: 1,
          letterSpacing: ".3rem",
        }}
      >
        {title}
      </Typography>
  )
}

export default PageName
