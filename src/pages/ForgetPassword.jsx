import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

const ForgetPassword = () => {
    const [msg, setmsg] = useState();
    const [forget, setforget] = useState("");

    const handleforget=(e)=>{
      // console.log(e.target.value)
      let passwordForget=e.target.value
      setforget(passwordForget)
    }  
    // console.log(forget)
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let obj={
            email:forget
        }
        console.log(obj)
        let res = await axios.post('https://backendpart-qfio.onrender.com/users/forget-password',obj);
        let data = res.data
        // console.log(data)
        setmsg(data.msg) 
    }
  return (

  <div >
    { msg? <h1>{msg}</h1>:<main className='m-auto' style={{width:"45vw"}}>
    <CssBaseline />
    <Sheet
      sx={{
        bgcolor:"thistle",
        // width: 300,
        padding:"10px",
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
      <div>
        <Typography level="h3" component="h1">
          <b>Welcome!</b>
        </Typography>
        <Typography level="body-sm">Forget password to continue.</Typography>
      </div>
      <FormControl>
        <FormLabel>Enter your Email</FormLabel>
        <Input
          // html input attribute
          onChange={handleforget}
          name="email"
          type="email"
          placeholder="johndoe@email.com"
        />
      </FormControl>
      <Button sx={{ mt: 1 /* margin top */ }} className='w-50 m-auto'  onClick={handleSubmit}>SUBMIT</Button>
      <Typography
        endDecorator={<Link to={'/login'}>Login</Link>}
        sx={{ fontSize: 'sm', alignSelf: 'center' }}
      >
        If you have remember password ?
      </Typography>
    </Sheet>
      </main>}

      {msg && <Link to={'/login'}  className='btn btn-success'>Login</Link>}
  </div>
  )
}

export default ForgetPassword
