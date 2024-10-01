import axios from 'axios'
import React, { useContext,  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserContext from '../context/UserContext'


import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';


const Login = () => {
  let ctx = useContext(UserContext)
  console.log(ctx)

  let navigate = useNavigate()


 const [LoginForm, setLoginForm] = useState({
  email:"",
  password:""
 });

 const handleLogin=(e)=>{
  // console.log(e.target.value)
  let value = e.target.value
  setLoginForm({...LoginForm,[e.target.name]:e.target.value})
 }

 const handleSubmit = async(e)=>{
  e.preventDefault();
  // let obj = {
  //   email:emailRef.current.value,
  //   password:passwordRef.current.value
  // }
    let obj={
    email:LoginForm.email,
    password:LoginForm.password
    }
//  console.log(LoginForm)
 console.log(obj)
  let res = await axios.post('https://backendpart-qfio.onrender.com/users/login',obj)
  if(res.data.success){
    console.log(res.data)
    localStorage.setItem('socialDetails',JSON.stringify({login:true,token:res.data.token}))
    ctx.setdetails({login:true,token:res.data.token})
    toast.success(res.data.msg,{position:"top-center"})
    navigate('/')
  }
  else{
    toast.error(res.data.msg,{position:'top-center'})
  }
}
  return (
    <main>
    {/* <ModeToggle /> */}
    <CssBaseline />
    <Sheet
      sx={{
        width: 500,
        bgcolor:'burlywood',
        mx: 'auto', // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
      variant="outlined"
    >
      <div className='d-flex flex-column gap-2'>
        <Typography level="h2" component="h1" className='d-flex justify-content-center'>
          <b>Welcome!</b>
        </Typography>
        <Typography level="h3" component="h1" className=' d-flex justify-content-center'>
          <b>Blogs login page!</b>
        </Typography>
        <Typography level="body-sm" className='d-flex justify-content-center'>Sign in to continue.</Typography>
      </div>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          // html input attribute
          // ref={emailRef}
          onChange={handleLogin}
          required
          name="email"
          type="email"
          placeholder="abcd@gmail.com"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          // html input attribute
          // ref={passwordRef}
          onChange={handleLogin}
          required
          name="password"
          type="password"
          placeholder="password"
        />
      </FormControl>
      <Button sx={{ mt: 1 /* margin top */ }} onClick={handleSubmit}  type="submit">Log in</Button>
      <Typography
        endDecorator={<Link to={'/sign'}>Sign up</Link>}
        sx={{ fontSize: 'sm', alignSelf: 'center' }}
      >
        Don&apos;t have an account?
      </Typography>
      <Typography
        endDecorator={<Link to={'/forgetpassword'}>forget password</Link>}
        sx={{ fontSize: 'sm', alignSelf: 'center' }}
      >
      Don&apos;t have remember password ?
      </Typography>
    </Sheet>
  </main>



  )
}

export default Login
