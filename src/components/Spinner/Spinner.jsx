import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import s from "./spinner.module.css"

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex' }} className={s.spinner}>
      <CircularProgress 
        className={s.color}/>
    </Box>
  )
}

