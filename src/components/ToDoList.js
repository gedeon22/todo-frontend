import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'

// Material UI
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
import { Button, TextField, Box, Modal, Menu, MenuItem, Container, Stack, Divider, Grid, CardContent, Typography, CardActions } from '@mui/material';
import {Add, Delete} from '@mui/icons-material/';
//Functions
import APIService from '../APIService';
import Header from './Header';
import ToDoItem from './ToDoItem';

function ToDoList() {

const [items, setItems] = useState([])
const [token, setToken, removeToken] = useCookies(['mytoken'])
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [newItem, setNewItem] = useState('')
const [isAdd, setIsAdd] = useState('add')
const [itemId, setItemId] = useState(0)
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => {
  setOpen(false)
  if(isAdd == 'add'){
    setIsAdd('edit')
  } else {
    setIsAdd('add')
    setTitle('')
    setDescription('')
  }
};


let navigate = useNavigate()

useEffect(() => {
  if(!token['mytoken'] | token['mytoken'] === 'undefined') {
    console.log(token['mytoken'])
    navigate('/')
  }
},[token])

useEffect(() => {
  APIService.GetItems(token)
  .then((items) => {
    items.sort(function(first, second) {
      return first['id'] - second['id'];
    });
    console.log('my items', items)
    setItems(items);
  })
  .catch((e) => console.log(e))
}, [newItem])

const insertItem = () => {
  let body = {title, description}
  console.log(body, token)
  APIService.InsertItem(body, token)
  .then(res => {
    setItems([...items, res])
    setNewItem(res)
    setTitle('')
    setDescription('')
    setOpen(false)
  })
  .catch(e => console.log(e))
}

const updateItem = () => {
  let body = {title, description}
  console.log(body, token)
  APIService.UpdateItem(itemId, body, token)
  .then(res => {
    //setItems([...items, res])
    setNewItem(res)
    setTitle('')
    setDescription('')
    setIsAdd('add')
    setOpen(false)
  })
  .catch(e => console.log(e))
}

const updatedInformation = (deletedArticle) => setNewItem(deletedArticle)

const changeItemInfo = (title, description) => {
  setTitle(title)
  setDescription(description)
  setOpen(true)
}


const changeIsAdd = (value) => setIsAdd(value)

const changeId = (value) => setItemId(value)

const logoutBtn = () => removeToken(['mytoken'])



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

return (
    <div align="left">
    <Header logoutBtn={logoutBtn}/>
    <Box alignItems="left" sx={{mx: 5}}>
    
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <h1>My ToDos</h1>
      </Grid>
      <Grid item xs={6}>
        <Stack direction="row" justifyContent="right">
          
          <Button onClick={handleOpen}>
            Add
            <Add sx={{fontSize:18}}/>
          </Button>
        </Stack>
      </Grid>
    </Grid>

    {items && items.map((item, index) => {
      return <ToDoItem key={item.id} item={item} updatedInformation={updatedInformation} index={index+1}
      changeItemInfo={changeItemInfo} changeIsAdd={changeIsAdd} changeId={changeId}/>
    })}
    
    </Box>


    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{mb:2}}>{isAdd == 'add' ? <p>Add a ToDo</p> : <p>Edit a ToDo</p>}</Typography>
        <Stack>
          <TextField onChange={(e) => setTitle(e.target.value)} value={title} label="Title" variant="outlined" sx={{mb: 3}}/>
          <TextField onChange={(e) => setDescription(e.target.value)} value={description} multiline rows="5" label="Description" variant="outlined"/>
        </Stack>
        <Stack direction="row" justifyContent="right">
          {isAdd == 'add' ? 
          <Button onClick={insertItem}>Submit</Button> : 
          <Button onClick={updateItem}>Update</Button> }
        </Stack>
      </Box>
    </Modal>



    </div>
  )
}

export default ToDoList