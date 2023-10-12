import axios from 'axios';
import React, { useContext, useState } from 'react'
import { CurrentUser } from '../App';

function Login({toggleRegistration, setAuth}) {
    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const {setCurrUserId} = useContext(CurrentUser);

    const [logError, setLogError] = useState('');

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});

    }

    const handleLogin = () =>{
        setLogError("");
        const {username, password} = user;

        axios.post(import.meta.env.VITE_SERVER + "/login", {username, password})
            .then((responce)=>{
                console.log(responce.data.user._id);
                setLogError("");
                setAuth(false);
                setCurrUserId(responce.data.user._id);
            })
            .catch((e)=>{
                if(e.response){
                    setLogError(e.response.data.message);
                }
            });
    }
  return (
    <div>
        <div className='flex flex-col m-2 border p-8 m-2'>
            {logError &&  (<p className='text-rose-800'>{logError}</p>)}
            <input onChange={handleChange} className='mb-1' type="text" placeholder='email' name='username' />
            <input onChange={handleChange} className='mb-1' type="password" placeholder='password' name='password'  />
            <button onClick={handleLogin} className='border rounded hover:bg-lime-600 '>Login</button>
        </div>
        <div className='flex'>Don't have an account? <div onClick={toggleRegistration} className='ml-1 cursor-pointer hover:text-lime-700'>Register here</div></div>
    </div>
  )
}

export default Login