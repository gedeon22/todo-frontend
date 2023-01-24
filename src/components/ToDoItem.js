import React from 'react'
import { useCookies } from 'react-cookie'

import { Button, TextField, Box, Menu, MenuItem, Container, Stack, Divider, Grid, CardContent, Typography, CardActions } from '@mui/material';
import {Add, Delete} from '@mui/icons-material/';

import APIService from '../APIService';

function ToDoItem(props) {

const [token, setToken, removeToken] = useCookies(['mytoken'])

const editBtn = () => {
    props.changeIsAdd('edit')
    props.changeId(props.item.id)
    props.changeItemInfo(props.item.title, props.item.description)
}

const deleteBtn = () => {
    APIService.DeleteItem(props.item.id, token)
    .then(res => props.updatedInformation(res))
}

return (
    <Box sx={{border: 1, borderColor:'#D3D3D3',  borderRadius: 5, p: 2, my: 2}}>
    <Grid container>
      <Grid item xs={6}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Priority #{props.index}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Stack direction="row" justifyContent="right">
          <Button onClick={editBtn} sx={{ p: 0, m: 0, fontSize: 12, textAlign:'left' }}>Edit</Button>
          <Button onClick={deleteBtn} sx={{ p: 0, m: 0, fontSize: 12, color: 'red', textAlign:'left' }}>
            Delete
            <Delete sx={{fontSize:18}}/>
          </Button>
        </Stack>
      </Grid>
    </Grid>
    <Typography variant="h5" sx={{ pb: 1 }}>
        {props.item.title}
    </Typography>
    <Typography variant="body1">
        {props.item.description}
    </Typography>
    </Box>
  )
}

export default ToDoItem