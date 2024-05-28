import React from 'react'
import { Loader } from '../styles/globalStyles'
import { Box } from '@mui/material'

const Loading = () => {
  return (
    <Box
          minHeight={"79vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Loader />
        </Box>
  )
}

export default Loading
