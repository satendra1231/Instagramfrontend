import React from 'react'

const GetpostComments = (props) => {
  console.log(props.comments)
    return (
    <div>
      {props.comments.map((ele)=>{
        return   <div>
            <label htmlFor="">{ele.user.name}</label>
            <input type="text" value={ele.text}/>
        </div>
      })

      }
    </div>
  )
}

export default GetpostComments
