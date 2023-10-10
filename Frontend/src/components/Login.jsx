import React from 'react'

function Login({toggleRegistration}) {
  return (
    <div>
        <div className='flex flex-col m-2 border p-8 m-2'>
            <input className='mb-1' type="text" placeholder='email'/>
            <input className='mb-1' type="password" placeholder='password' />
            <button className='border hover:bg-lime-600 '>Login</button>
        </div>
        <div className='flex'>Don't have an account? <div onClick={toggleRegistration} className='ml-1 cursor-pointer hover:text-lime-700'>Register here</div></div>
    </div>
  )
}

export default Login