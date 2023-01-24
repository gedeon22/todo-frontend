import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import APIService from '../APIService'
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'


const theme = createTheme();

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setLogin] = useState(true)
    const [isWrong, setIsWrong] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {
      if(token['mytoken'] && token['mytoken'] !== 'undefined') {
        navigate('/items')
        console.log(token['mytoken'])
      }
    })

    const loginBtn = () => {
        APIService.LoginUser({username,password})
        .then(resp => {
          console.log(resp)
          setToken('mytoken', resp.token)
        })
        .then(error => {
            setIsWrong(true)
            console.log('error', error)
        })
    }

    const RegisterBtn = () => {
      APIService.RegisterUser({username, password})
      .then(() => loginBtn())
      .then(error => console.log(error))
    }

  return (
    
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <h1>Welcome to my ToDo App!</h1>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isWrong ?
          <Typography component="h5" color="red" sx={{mb:3}}>
          Wrong username or password. Please try again!
          </Typography>
            :
            ''
          }
          {isLogin ? 
          <Typography component="h1" variant="h5">
            Sign in
          </Typography> :
          <Typography component="h1" variant="h5">
          Register
        </Typography> 
        }
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="useranme"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />
            {isLogin ? 
            <Button type="submit" onClick ={loginBtn} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button> :
            <Button type="submit" onClick ={RegisterBtn} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Register
            </Button>
            }
            <Grid container>
              <Grid item>
                {isLogin ? 
                <Button onClick={() => setLogin(false)}>
                  {"Don't have an account? Sign Up"}
                </Button>
                :
                <Button onClick={() => setLogin(true)}>
                  {"Have an account? Sign In"}
                </Button>
                } 
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}