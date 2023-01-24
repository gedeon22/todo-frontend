import React from 'react'
import {useNavigate} from 'react-router-dom'

import { Button, TextField, Box, Menu, MenuItem, Container, Stack, Divider, Grid } from '@mui/material'

function Header(props) {

let navigate = useNavigate()

  return (
    <Box display="flex" alignItems="center" sx={{bgcolor: '#D3D3D3', minHeight: '10vh', }}>
    <Grid container spacing={1} sx={{mx: 5}}>
      <Grid item xs={1}>
        <Stack direction="row" justifyContent="left">
          <Button onClick={() => navigate('/items')} variant="outlined" sx={{borderColor: 'black', color: 'black'}}>Home</Button>
        </Stack>
      </Grid>
      {/* <Grid item xs={1}>
        <Stack direction="row" justifyContent="left">
            <Button variant="outlined" sx={{borderColor: 'black', color: 'black'}}>My items</Button>
        </Stack>
      </Grid> */}
      <Grid item xs={11}>
        <Stack direction="row" justifyContent="right">
          <Button onClick={props.logoutBtn} variant="outlined" sx={{borderColor: 'black', color: 'black'}}>Logout</Button>
        </Stack>
      </Grid>
    </Grid>
    </Box>
  )
}

export default Header