import React, { useState } from 'react'
import Login from './Login'
import Registration from './Registration';

function Auth({setAuth}) {
    const [registration, setRegistration] = useState(false);

    const toggleRegistration = () =>{
        setRegistration(!registration);
    };

  return (
    <div className='flex justify-center items-center w-screen h-screen flex-col'>
        {!registration && (<Login toggleRegistration={toggleRegistration} setAuth={setAuth}/>)}
        {registration && (<Registration toggleRegistration={toggleRegistration}/>)}
    </div>
  )
}

export default Auth