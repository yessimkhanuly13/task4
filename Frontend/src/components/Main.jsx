import axios from 'axios'
import React, { useEffect } from 'react'

function Main() {

    useEffect(()=>{
        axios.get('http://localhost:5000/auth/users')
        .then((responce)=>{
            console.log(responce.data)
        })
        .catch((e)=>console.log(e));
    },[])

  return (
    <div>Main</div>
  )
}

export default Main