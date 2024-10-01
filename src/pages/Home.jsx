import React, { useContext, useRef, useState } from 'react'
import AllUserPost from '../component/AllUserPost'
import UserContext from '../context/UserContext';
import axios from 'axios';

const Home = () => {
  let ctx = useContext(UserContext);
  console.log(ctx)

  const [clicked, setclicked] = useState(false);
  const [files, setfiles] = useState("");
  let titleRef = useRef()
  let descriptionRef = useRef()

  const handleInputChanger=(e)=>{
    let value=e.target.files[0]
    console.log(value)
    setfiles(value)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    let formData = new FormData();
    formData.append('file',files);
    formData.append('upload_preset','social')
    
    let data = await axios.post(' https://api.cloudinary.com/v1_1/doeogvoiy/upload',formData)
    // console.log(data.data.secure_url)


    let obj = {
      title:titleRef.current.value,
      description:descriptionRef.current.value,
      file:data.data.secure_url
    }

    let res = await axios.post('https://backendpart-qfio.onrender.com/posts/create',obj,{
           headers:{
            'Authorization':ctx.details.token
           }
         });
         console.log(res.data)
         setclicked(false)
  }


  // method -1 using file reader
  // const handleSubmit=(e)=>{
  //   e.preventDefault()

  //   let reader = new FileReader();
  //   reader.readAsDataURL(files);

  //   reader.onload=async()=>{

  //     let obj={
  //       title:titleRef.current.value,
  //       description:descriptionRef.current.value,
  //       file:reader.result
  //     }
  //     console.log(obj)
  //     let res = await axios.post('http://localhost:5000/posts/create',obj,{
  //       headers:{
  //         'Authorization':ctx.details.token
  //       }
  //     });
  //     let data = res.data
  //     console.log(data)
  //     setclicked(false)
  //   }
  //   reader.onerror=()=>{
  //     console.log(reader.error)
  //   }
   
    
  // }
  return (
    <div className='row m-0 p-0 bg-info mt-2' >
     <div className="col-md-2 col-sm-3 mt-2 create ">
      <button onClick={()=>setclicked(true)} className='btn btn-warning' >Create</button>
     </div>
     <div className="col-md-9 col-sm-8" >
      <AllUserPost clicked={clicked}/>
     </div>

     {
      clicked  && <div className="form">
      <button onClick={()=>setclicked(false)} type="button" class="btn-close bg-white btnCloseForm" aria-label="Close"></button>
 <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input ref={titleRef} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Desctiption</label>
    <div className="form-floating mb-3">
  <textarea ref={descriptionRef} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
  <label htmlFor="floatingTextarea">description</label>
</div>
  </div>
  <div className="mb-3">
  <label htmlFor="formFileSm" className="form-label">Upload Image/video</label>
  <input onChange={handleInputChanger} className="form-control form-control-sm" id="formFileSm" type="file"/>
</div>
 

  <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
</form>

      </div>}

    </div>
  )
}

export default Home
