import axios from 'axios';
import React, { useState } from 'react'

function Login({toggleRegistration, setAuth}) {
    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const [logError, setLogError] = useState('');

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    }

    const handleLogin = () =>{
        const {username, password} = user;

        axios.post('http://localhost:5000/auth/login', {username, password})
            .then((responce)=>{
                console.log(responce.data)
                setLogError("");
                setAuth(false);
            })
            .catch((e)=>{
                if(e.response){
                    setLogError(e.response.data.message);
                }
                setUser({});
            });
    }
  return (
    <div>
        <div className='flex flex-col m-2 border p-8 m-2'>
            {logError &&  (<p className='text-rose-800'>{logError}</p>)}
            <input onChange={handleChange} className='mb-1' type="text" placeholder='email' name='username'/>
            <input onChange={handleChange} className='mb-1' type="password" placeholder='password' name='password' />
            <button onClick={handleLogin} className='border hover:bg-lime-600 '>Login</button>
        </div>
        <div className='flex'>Don't have an account? <div onClick={toggleRegistration} className='ml-1 cursor-pointer hover:text-lime-700'>Register here</div></div>
    </div>
  )
}

export default Login