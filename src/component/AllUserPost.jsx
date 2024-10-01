import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
 import UserContext from '../context/UserContext';

import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
// import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import { IoEye } from "react-icons/io5";
import { red } from '@mui/material/colors';
import { jwtDecode } from "jwt-decode";
import ShowSingleBlog from '../pages/ShowSingleBlog';
import AddComments from '../pages/AddComments';
// import { FaRegHeart } from "react-icons/fa6";
import FavoriteIcon from '@mui/icons-material/Favorite';

const AllUserPost = (props) => {
    let ctx = useContext(UserContext)
    let token = ctx.details.token
    // console.log(token)
    const decoded = jwtDecode(token);
  //  console.log(decoded)

    const [AllPosts, setAllPosts] = useState([]);
    // const [heartclick, setheartclick] = useState(false);
    const [selectedPostId, setselectedPostId] = useState("");
    const [postSubmited, setpostSubmited] = useState(false);
    const [IsModalOpen, setIsModalOpen] = useState(false);

    let commentRef = useRef()
   
    let getAllData = async()=>{
        let res = await axios.get('https://backendpart-qfio.onrender.com/posts/getall')
        let data = res.data;
        // console.log(data.data)
        setAllPosts(data.data)
    }
    useEffect(()=>{
        getAllData()
    },[props.clicked,postSubmited])

    const handleHeart = async(postId)=>{
       console.log(postId)
       let res = await fetch(`https://backendpart-qfio.onrender.com/posts/updatelike/${postId}`,{
        method:"PUT",
        headers:{
          'content-type':'application/json',
          'Authorization':token
        }
       })
       let data = await res.json();
      //  console.log(data)
       getAllData()
        }

    const showForm=(id)=>{
      setselectedPostId(id)
      setIsModalOpen(true);
  
    }
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  

    const submitComment=async()=>{
        let text = commentRef.current.value;
        // console.log(text)
        // console.log(token)

        let res = await fetch(`https://backendpart-qfio.onrender.com/posts/addComment/${selectedPostId}`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                'Authorization':ctx.details.token
            },
            body:JSON.stringify({text:text})
        })
        let data = await res.json()
        // console.log(data)
        setpostSubmited(!postSubmited)
    }
    const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

const [selectedEle, setselectedEle] = useState("");
  const showLoading = (ele) => {
    setOpen(true);
    setLoading(true);
    setselectedEle(ele)

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

      const [commentPost, setcommentPost] = useState("");
      const handleChanger=(e)=>{
        // console.log(e.target.value)
        let commentHandle=e.target.value
        // console.log(commentHandle)
        setcommentPost(commentHandle)
      }
      // console.log(commentPost)
    const submitCommentHandle = async(postId)=>{
        // console.log(postId)
        let obj = {
          text:commentPost
        }
        // console.log(obj)
        let res = await fetch(`https://backendpart-qfio.onrender.com/posts/addComment/${postId}`,{
          method:"POST",
          headers:{
            'content-type':'application/json',
            'Authorization':token
          },
          body:JSON.stringify(obj)
        })
        let data = await res.json();
        // console.log(data)
        getAllData()
        setcommentPost("")
       }

  return (
    <div className='row justify-content-center gap-2'>
        {
            AllPosts.map((ele)=>{
              return    <Card
              variant="outlined"
              sx={{ minWidth: 300, '--Card-radius': (theme) => theme.vars.radius.xs }}
            >
              <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                     
                      right: 0,
                      m: '-2px',
                      borderRadius: '50%',
                      // background:
                      //   'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                    },
                  }}
                >
           
                    <Avatar sx={{ bgcolor: red[500],fontSize:35}} aria-label="recipe">
                      {ele.userId.name[0]}
                    </Avatar>
                
                     
                </Box>
                <Typography sx={{ fontWeight: 'lg' }}>{ele.userId.name}</Typography>
                
              </CardContent>
              <CardOverflow>
                <AspectRatio>
                
                 {ele.file.split('/')[4]==='image' ?  <img src={ele.file} className="card-img-top p-0 m-0" alt="..." /> :
                      <video controls src={ele.file} ></video>
                      }

                </AspectRatio>
              </CardOverflow>
              <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
                <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                  <IconButton onClick={()=>handleHeart(ele._id)} variant="plain" color="neutral" size="sm">
                    <FavoriteIcon  sx={{color:ele.likes.includes(decoded._id)&&`${red[500]}`}}/>
                  </IconButton> 
                  <IconButton onClick={()=>showForm(ele._id)} variant="plain" color="neutral" size="sm">
                    <ModeCommentOutlined    />
                  </IconButton>
                  {ele._id===selectedPostId && <div className=' col-md-3'>
          <AddComments token={token} getAllData={getAllData} isModalOpen={IsModalOpen} handleCancel={handleCancel} handleOk={handleOk} ele={ele}/>
         </div>}

                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
              
                </Box>
                <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
                   <IconButton variant="plain" color="neutral" size="sm">
                 
                   <IoEye style={{fontSize:"40px"}}  onClick={()=>showLoading(ele)}/>
               {ele._id===selectedEle._id && <ShowSingleBlog ele={selectedEle}  open={open} setOpen={setOpen} loading={loading} showLoading={showLoading}/>}

                  </IconButton> 
                </Box>
              </CardContent>
              <CardContent>
                <Link
                  component="button"
                  underline="none"
                  textColor="text.primary"
                  sx={{ fontSize: 'sm', fontWeight: 'lg' }}
                >
                  {ele.likes.length>0? ele.likes.length:''} Likes
                 
                </Link>
                <Typography sx={{ fontSize: 'sm' }} className='text-truncate' width={"400px"} >
                  <Link
                    component="button"
                    color="neutral"
                    textColor="text.primary"
                    sx={{ fontWeight: 'lg' }}
                  >
                    {ele.userId.name} 
                  </Link>{' '}
                  {ele.title}
                </Typography>
                <Link className='text-truncate' width={"400px"}
                  component="button"
                  underline="none"
                  
                  sx={{ fontSize: 'sm', color: 'text.tertiary' }}
                >
                 {ele.comments.length>0? ele.comments.length:''} comments
                </Link>
                <Link className='text-truncate' width={"400px"}
                  component="button"
                  underline="none"
                  
                  sx={{ fontSize: 'sm', color: 'text.tertiary' }}
                >
                </Link>
                
              </CardContent>
              <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                  <Face />
                </IconButton>
              
                <input onChange={handleChanger} type="text" value={commentPost} placeholder='Add a comment ........' className='w-75'/>
                  <button className='btn btn-success' onClick={()=>submitCommentHandle(ele._id)}>Post</button>
              </CardContent>
            </Card>
            })
        }
      
    </div>

 
  )
}

export default AllUserPost
