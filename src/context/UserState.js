import React, { useState } from 'react'
import UserContext from './UserContext'

const UserState = (props) => {
  let userDetails = JSON.parse(localStorage.getItem('socialDetails'))
    const [details, setdetails] = useState({
        login:userDetails?  userDetails.login : false,
        token:userDetails?  userDetails.token : ''
    });
    console.log(details)
  return (
    <UserContext.Provider value={{details,setdetails}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserState
