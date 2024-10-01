import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import { AiFillDelete } from "react-icons/ai";



const YourBlogs = () => {
  let ctx=useContext(UserContext)

  const [blogs, setblogs] = useState([]);

  let getBlogs = async()=>{
    let res = await axios.get('https://backendpart-qfio.onrender.com/posts/getSingleUser',{
      headers:{
        'Authorization':ctx.details.token
      }
    })
    console.log(res.data)
    setblogs(res.data.data)
  }
  useEffect(()=>{
    getBlogs()
},[])

const handleDelete = async(ans)=>{
  console.log(ans._id)
  let res = await axios.delete(`https://backendpart-qfio.onrender.com/posts/delete/${ans._id}`)
  let data= res.data
  if(data.success){
    toast.success(data.msg)
    getBlogs()
  }
  else{
    toast.error(data.msg)
  }
}


  return (
    <div className='row m-0 p-0 justify-content-center gap-2 bg-warning'>
      {
        blogs.map((ele)=>{
          //     return <div className="card p-2" style={{width: '18rem'}}>
          // {ele.file.split('/')[4]==='image' ?  <img src={ele.file} className="card-img-top" alt="..." style={{height:"250px"}} />: <video controls src={ele.file} style={{height:"250px"}}></video>
          // }
         
        
          // <div className="card-body">
          // <h5 className="card-title">{ele.title}</h5>
         
          // </div>
          // <div className='ps-3 pb-2'>
          // <a href="#" className="btn btn-primary">view full blog</a>
         
         

          // </div>
          // <MdDelete onClick={()=>handleDelete(ele)} color='red' className='deleteIcon' size={25}/>
           
          // </div>

          return  <div className='col-3' style={{width:"400px"}}>
              <Box sx={{ minHeight: 400,  width: 350,}}  >
          <Card
            variant="outlined"
            sx={(theme) => ({
              width: 350,
              height:350,
              gridColumn: 'span 2',
              flexDirection: 'row',
              flexWrap: 'wrap',
              resize: 'horizontal',
              overflow: 'hidden',
              gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
              transition: 'transform 0.3s, border 0.3s',
              '&:hover': {
                borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                transform: 'translateY(-2px)',
              },
              '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
            })}
          >
            {/* <AspectRatio
              variant="soft"
              sx={{
                flexGrow: 1,
                display: 'contents',
                '--AspectRatio-paddingBottom':
                  'clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
                loading="lazy"
                alt=""
              />
            </AspectRatio> */}
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200 }}
            >
              <Box sx={{ display: 'flex' }}>
                <div>
                  <Typography level="title-lg">
                    <Link
                      href="#container-responsive"
                      overlay
                      underline="none"
                      sx={{
                        color: 'text.primary',
                        '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                      }}
                    >
                      {ele.title}
                    </Link>
                  </Typography>
                 
                </div>
               
              </Box>
              <AspectRatio
                variant="soft"
                sx={{
                  '--AspectRatio-paddingBottom':
                    'clamp(0px, (100% - 200px) * 999, 200px)',
                  pointerEvents: 'none',
                }}
              >
                {/* <img
                  alt=""
                  src={ele.file}
                /> */}
                <div>
                   {ele.file.split('/')[4]==='image' ?  <img src={ele.file} className="card-img-top" alt="..." style={{height:"300px", width:"300px"}} />: <video controls src={ele.file} style={{height:"300px"}}></video>
                  }
                </div>
              </AspectRatio>
              <div>
              <Typography level="body-sm">{ele.description}</Typography>
              </div>
              {/* <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                <Avatar variant="soft" color="neutral">
                 s
                </Avatar>
                <div>
                  <Typography level="body-xs">Designed by</Typography>
                  <Typography level="body-sm">Nature itself</Typography>
                </div>
              </Box> */}
               <div className='d-flex' >
               <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  sx={{  alignSelf: 'flex-start' }}
                >
                  <FavoriteBorderRoundedIcon color="danger" />
                    <sup>{ele.likes.length}</sup>
                
                </IconButton>
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  sx={{ml:'auto', alignSelf: 'flex-start' }}
                >
                <ModeCommentOutlined   />
                <sup>{ele.comments.length}</sup>
                </IconButton>
                <IconButton
                  size="sm"
                  
                  color="neutral"
                  sx={{ ml:'auto', alignSelf: 'flex-start' }}
                >
                  <AiFillDelete onClick={()=>handleDelete(ele)} color='red'  fontSize={25} />
                {/* <MdDelete  onClick={()=>handleDelete(ele)} color='red' className='deleteIcon' fontSize={25}/> */}
                </IconButton>
           
        
               </div>
            </Box>
          </Card>
        </Box>
          </div>

        })
      }
      
    </div>
  )
}

export default YourBlogs
