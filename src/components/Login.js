import React, {useState, useEffect} from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setLogin] = useState(true)
    let navigate = useNavigate()

    useEffect(() => {
      if(token['mytoken']) {
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
        .then(error => console.log(error))
    }

    const RegisterBtn = () => {
      APIService.RegisterUser({username, password})
      .then(() => loginBtn())
      .then(error => console.log(error))
    }

  return (

    <div className='App'>
        <br/>
        <br/>
        {isLogin? <h1>Please Login</h1> : <h1>Please Register</h1>}
        
        <div className='mb-3'>
            <br/>
            <br/>
            <label htmlFor='username' className='form-label'>Username</label>
            <input type='text' className='form-control' 
            onChange={(e) => setUsername(e.target.value)} id='username' value={username} placeholder='Please enter username'/>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' 
            onChange={(e) => setPassword(e.target.value)} id='password' value={password} placeholder='Please enter password'/>
            <br/>
            <br/>
            {isLogin ? 
            <button onClick={loginBtn} className='btn btn-primary'>Login</button> :
            <button onClick={RegisterBtn} className='btn btn-primary'>Register</button>
            }
            <div className='mb-3'>
              <br/>
              {isLogin ? <h5>If no account, please <button className='btn btn-primary' onClick={() => setLogin(false)}>register</button> here</h5> : 
              <h5>Please <button className='btn btn-primary' onClick={() => setLogin(true)}>login</button></h5>}
            </div>
        </div>
    </div>
  )
}

export default Login