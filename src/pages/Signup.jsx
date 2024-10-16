
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

const Signup = () => {

  let navigate = useNavigate()
  const [signform, setsignform] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleSign=(e)=>{
    // console.log(e.target.value)
    let value=e.target.value
    setsignform({...signform,[e.target.name]:e.target.value})
   
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
  
      let obj={
        name:signform.name,
        email:signform.email,
        password:signform.password
      }
    console.log(obj)
    let res = await axios.post('https://backendpart-qfio.onrender.com/users/create',obj)
    // console.log(res.data)
    if(res.data.success){
      toast.success(res.data.msg,{position:'top-center'})
      navigate('/login')
    }else{
      // alert(res.data.msg)
      toast.error(res.data.msg,{position:'top-center'})
    }
  }
  return (
    <main className='m-auto ' style={{width:'60vw'}}>
    {/* <ModeToggle /> */}
    <CssBaseline />
    <Sheet
      sx={{
        // width: 'max-content',
        bgcolor:'silver',
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
          <b>Blogs Sign-up page!</b>
        </Typography>
        <Typography level="body-sm" className='d-flex justify-content-center'>Sign in to continue.</Typography>
      </div>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input  
          // html input attribute
          //  ref={nameRef}
          onChange={handleSign}
          required
          name="name"
          type="text"
          placeholder="abcd"

          sx={{textTransform:'uppercase'}}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          // html input attribute
          //  ref={emailRef}
           onChange={handleSign}
          required
          name="email"
          type="email "
          placeholder="abcd@gmail.com"

          sx={{textTransform:'lowercase'}}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          // html input attribute
          //  ref={passwordRef}
           onChange={handleSign}
          required
          name="password"
          type="password"
          placeholder="password"
        />
      </FormControl>
      <Button sx={{ mt: 1 /* margin top */ }} className='m-auto w-50'  onClick={handleSubmit}  type="submit">Submit</Button>
      <Typography
        endDecorator={<Link to={'/login'}>Login</Link>}
        sx={{ fontSize: 'sm', alignSelf: 'center'}}
      >
        Already have an account?
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

export default Signup