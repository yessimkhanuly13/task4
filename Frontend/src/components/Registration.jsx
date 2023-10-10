import React, { useState } from 'react'
import axios from 'axios'

function Registration({toggleRegistration}) {
    const [user, setUser] = useState({
        username:"",
        password:"",
        name:""
    });
    
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
        console.log(user);
    }

    const handleRegistration = () =>{
        console.log('here');
        const { username, password, name } = user;

        axios.post('http://localhost:5000/auth/registration', {username, password, name})
            .then((responce)=>{
                console.log('Success!');
                console.log(responce.data)
                toggleRegistration();
            })
            .catch((e)=>{
                console.log(e);
            })
    }

  return (
    <div className='flex flex-col m-2 border p-8 m-2'>
        <input onChange={handleChange} className='mb-1' type='text' placeholder='name' name="name"/>
        <input onChange={handleChange} className='mb-1' type='text' placeholder='email' name="username"/>   
        <input onChange={handleChange} className='mb-1' type='password' placeholder='password' name="password"/>
        <button onClick={handleRegistration} className='border hover:bg-lime-600'>Submit</button>
    </div>
  )
}

export default Registration