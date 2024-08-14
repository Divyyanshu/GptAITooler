import React from 'react'
import {Box , Link  , Typography} from "@mui/material"
const Navbar = () => {
  return (
    <Box width ={"100"} p= "1rem 6%" textAlign={'center'} sx={{boxShadow:4 ,mb:2 ,bgcolor:"purple",color:white}}>
      <Typography variant="h1" color="initial">
        AI-Gpt
      </Typography>
    </Box>
  )
}

export default Navbar