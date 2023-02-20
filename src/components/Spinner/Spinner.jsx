import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { color } from '@mui/system';
import s from "./spinner.module.css"

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex' }} className={s.spinner}>
      <CircularProgress 
        // color= 'success'
        className={s.color}/>
    </Box>
  )
}

