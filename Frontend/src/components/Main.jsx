import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentUser } from '../App';
import Navbar from './Navbar';

function Main({setAuth}) {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const {currUserId} = useContext(CurrentUser);


    useEffect(()=>{
        axios.get('http://localhost:5000/auth/users')
        .then((response)=>{
          setUsers(response.data);
          console.log(response.data);
        })
        .catch((e)=>console.log(e));
    },[])

    const handleUserSelection = (userId) => {
      if (selectedUsers.includes(userId)) {
        setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      } else {
        setSelectedUsers([...selectedUsers, userId]);
      }
    };

    const unixToLocaleString = (unix) =>{
      const date = new Date(unix/1000 * 1000);
      return date.toLocaleString();
    }

    const handleUserDelete = () =>{
      selectedUsers.forEach((userId)=>{
        axios.delete(`http://localhost:5000/auth/users/${userId}`)
        .then((res)=>{
            console.log(res.data);
            const updatedUsers = users.filter((user)=> user._id !== userId);
            setUsers(updatedUsers);
            if(userId === currUserId){
              setAuth(true);
            }
        })
        .catch((e)=>console.log(e))
      })
      setSelectedUsers([]);
    }

    const handleBlock = () =>{
      selectedUsers.forEach((userId)=>{
          axios.put(`http://localhost:5000/auth/users/${userId}`)
          .then((res)=>{
            console.log(res.data);
            const updatedUsers = users.map((user)=>{
              if(user._id === userId){
                user.blocked = 'Blocked'
              }

              if(user.blocked === 'Blocked' && user._id === currUserId){
                setAuth(true);
              }
              return user;
            });

            setUsers(updatedUsers);
          })
          .catch((e)=>console.log(e))
      })
    }

    const handleUnblock = () =>{
      selectedUsers.forEach((userId)=>{
          axios.put(`http://localhost:5000/auth/users/${userId}`)
          .then((res)=>{
            console.log(res.data);
            const updatedUsers = users.map((user)=>{
              console.log(user);
              if(user._id === userId){
                user.blocked = 'Active';
              }
              
              return user;
            });

            setUsers(updatedUsers);
          })
          .catch((e)=>console.log(e))
      })
    }
    

  return (
    <div className='w-full text-center flex-col justify-center items-center h-screen'>
      
      <Navbar handleBlock={handleBlock} handleUnblock={handleUnblock} handleUserDelete={handleUserDelete} setAuth={setAuth}/> 
      <div className='justify-center items-center flex mt-4'>
      <table className='border'>
        <thead className='border'>
          <tr className='bg-slate-50'>
            <th onClick={()=>console.log(currUserId)} className='border p-2 m-1'>Select</th>
            <th className='border p-2 m-1'>ID</th>
            <th className='border p-2 m-1'>Name</th>
            <th className='border p-2 m-1'>Email</th>
            <th className='border p-2 m-1'>Last Login Time</th>
            <th className='border p-2 m-1'>Registration Time</th>
            <th className='border p-2 m-1'>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className='odd:bg-white even:bg-slate-100' key={user._id}>
              <td className='border p-2 m-1'>
                <input 
                  className='cursor-pointer'
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleUserSelection(user._id)}
                />
              </td>
              <td className='border p-2 m-1'>{user._id}</td>
              <td className='border p-2 m-1'>{user.name}</td>
              <td className='border p-2 m-1'>{user.username}</td>
              <td className='border p-2 m-1'>{unixToLocaleString(user.lastLogDate)}</td>
              <td className='border p-2 m-1'>{unixToLocaleString(user.date)}</td>
              <td className='border p-2 m-1'>{user.blocked}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Main