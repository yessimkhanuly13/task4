import React from 'react'
import lock from '../assets/lock.png' 
import bin from '../assets/bin.png'
import unlock from '../assets/unlock.png'

function Toolbar({handleUserDelete, handleBlock, handleUnblock}) {
  return (
    <div className='flex ml-8'>
        <div className='flex'>
            <button className='w-12 h-12 flex-col border rounded p-2 m-2 hover:bg-red-500 bg-red-400' onClick={handleUserDelete}><img src={bin} alt="Delete" /></button>
            <button className='w-12 h-12 flex-col border rounded p-2 m-2 hover:bg-red-500' onClick={handleBlock}><img src={lock} alt="Block" /></button>
            <button className='w-12 h-12 flex-col border rounded p-2 m-2 hover:bg-green-500' onClick={handleUnblock}><img src={unlock} alt="Unblock" /></button>
        </div>
  </div>
  )
}

export default Toolbar