import React from 'react'

function Registration() {
  return (
    <div className='flex flex-col m-2 border p-8 m-2'>
        <input className='mb-1' type='text' placeholder='name'/>
        <input className='mb-1' type='text' placeholder='email'/>   
        <input className='mb-1' type='password' placeholder='password'/>
        <button className='border hover:bg-lime-600'>Submit</button>
    </div>
  )
}

export default Registration