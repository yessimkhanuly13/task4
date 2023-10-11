import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Main() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/auth/users')
        .then((response)=>{
          setUsers(response.data);
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

  return (
    <div className='w-full text-center'>
         <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login Time</th>
            <th>Registration Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleUserSelection(user._id)}
                />
              </td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{unixToLocaleString(user.lastLogDate)}</td>
              <td>{unixToLocaleString(user.date)}</td>
              <td>{user.blocked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Main