import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentUser } from '../App';
import Toolbar from './Toolbar';

function Main({setAuth}) {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [currentUser, setCurrentUser] = useState(""); 

    const {currUserId} = useContext(CurrentUser);


    useEffect(()=>{
        axios.get('http://localhost:5000/auth/users')
        .then((response)=>{
          setUsers(response.data);
          console.log(response.data);

          response.data.map((user)=>{
            if(user._id === currUserId){
              setCurrentUser(user.name);
            }
          });
          console.log(currentUser);
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
          axios.put(`http://localhost:5000/auth/users/block/${userId}`)
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
          axios.put(`http://localhost:5000/auth/users/unblock/${userId}`)
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
            console.log(updatedUsers);
          })
          .catch((e)=>console.log(e))
      })
    }

    const handleSelectAllChange = () => {
      const allUserIds = users.map((user) => user._id);
      if (selectAllChecked) {
        setSelectedUsers([]);
      } else {
        setSelectedUsers(allUserIds);
      }
      setSelectAllChecked(!selectAllChecked);
    };
    

  return (
    <div className='h-screen flex-col'>
      <div className='flex justify-end mr-10'>Hello, {currentUser}! <span onClick={()=>setAuth(true)} className='ml-3 cursor-pointer text-red-500 underline'>Logout</span></div>
      <Toolbar handleBlock={handleBlock} handleUnblock={handleUnblock} handleUserDelete={handleUserDelete}/> 
      <div className='flex'>
      <table className='border w-full ml-10 mr-10 mb-4'>
        <thead className='border'>
          <tr className='bg-slate-50'>
            <th className='border p-2'><input 
                  className='cursor-pointer'
                  type="checkbox"
                  checked={selectAllChecked}
                  onChange={handleSelectAllChange}
                /></th>
            <th className='border p-2'>ID</th>
            <th className='border p-2'>Name</th>
            <th className='border p-2'>Email</th>
            <th className='border p-2'>Last Login Time</th>
            <th className='border p-2'>Registration Time</th>
            <th className='border p-2'>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className='odd:bg-white even:bg-slate-100 text-center' key={user._id}>
              <td className='border p-2 m-1'>
                <input 
                  className='cursor-pointer'
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleUserSelection(user._id)}
                />
              </td>
              <td className='border p-2'>{user._id}</td>
              <td className='border p-2'>{user.name}</td>
              <td className='border p-2'>{user.username}</td>
              <td className='border p-2'>{unixToLocaleString(user.lastLogDate)}</td>
              <td className='border p-2'>{unixToLocaleString(user.date)}</td>
              <td className='border p-2'>{user.blocked}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Main