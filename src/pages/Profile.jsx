import React, { useContext, useEffect, useRef, useState } from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import UserContext from '../context/UserContext';
import axios from 'axios';

const Profile = () => {
  const [details, setdetails] = useState("");
  console.log(details)
  let store = useContext(UserContext)

  let getUser=async()=>{
    let res = await axios.get('https://backendpart-qfio.onrender.com/users/getUser',{
      headers:{
        'Authorization':store.details.token
      }
    })
    let data = res.data;
    setdetails(res.data.user)
  }
  useEffect(()=>{
    getUser()
  },[])

  let nameRef = useRef()
  let passwordRef=useRef()
    const updateHandler = async()=>{
        // console.log("hello")
        let obj = {};
        let name = nameRef.current.value;
        let password = passwordRef.current.value

        if(name){
            obj.name=name
        }
        if(password){
            obj.password=password
        }

      let res = await fetch(`https://backendpart-qfio.onrender.com/users/update`,{
        method:"PUT",
        headers:{
            'content-type':'application/json',
            'Authorization':store.details.token
        },
        body:JSON.stringify(obj)
      })

      let data = await res.json();
      console.log(data)
      nameRef.current.value=""
      passwordRef.current.value=""

      getUser()
        
    }

  return (
    <Box
      sx={{
        m:0,
        p:0,
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography sx={{ fontSize: 'xl', fontWeight: 'lg' }}>
            {details.name}
          </Typography>
          <Typography
            level="body-sm"
            textColor="text.tertiary"
            sx={{ fontWeight: 'lg' }}
          >
           
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              flexDirection:'column',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
              <label style={{width:"115px"}} htmlFor="">Update-Name:</label>  <input ref={nameRef}   className='w-50' type="text" placeholder='enter your name' />
              </Typography>

            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
              <label style={{width:"115px"}} htmlFor="">Email:</label>  <input disabled value={details.email} className='w-50' type="text" placeholder='enter your email'/>
              </Typography>
              
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
              <label style={{width:"115px"}} htmlFor="">Update-Password:</label>   <input ref={passwordRef}  className='w-50' type="text"  placeholder='enter your password'/>
              </Typography>
            
            </div>
            <button onClick={updateHandler} className='btn btn-primary' style={{width:"50vw"}}>Update Details</button>


          </Sheet>
          {/* <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button variant="outlined" color="neutral">
              Chat
            </Button>
            <Button variant="solid" color="primary">
              Follow
            </Button>
          </Box> */}
        </CardContent>
      </Card>
    </Box>
  )
}

export default Profile

