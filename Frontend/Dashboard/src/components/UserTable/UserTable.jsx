import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { StoreContext } from '../Context/Storecontext';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';


export default function UserTable() {
  const navigate = useNavigate(); // Initialize navigate
  const {
    url,
    getmanagers,
    managers,
    user,
    loginId,
    Usertasks,
    setUsertasks
    , taskMessage,
    setTaskMessage,
    managertasks,
    setManagertasks,
    setManagerAssignedUserId } = useContext(StoreContext);
  const [Allusers, setAllusers] = useState([]);
  const [message, setMessage] = useState(null);
  const [Managerloading, setManagerloading] = useState(true)
  const [selectedManagers, setSelectedManagers] = useState({});


  const updateManager = async (_id, managerId, name, role) => {
    const response = await axios.post(`${url}/api/user/update/${_id}`, {_id, 
      assigned: { id: managerId, name: name, role: role } 
    }, {
      withCredentials: true,
    });
    if (response.data.success) {
        console.log(response.data);
        getusers();
        // toast.success("Status Updated Successfully")
    } else {
        console.log('not updated');
        // toast.error('Error')
    }
};
  const handleManagerChange = (event, userId) => {
    const selectedManager = event.target.value;
  
    const managerId = selectedManager._id;
    const name = selectedManager.name;
    const role = selectedManager.role;
  
    setSelectedManagers((prevSelectedManagers) => ({
      ...prevSelectedManagers,
      [userId]: selectedManager, // Update only the targeted user's manager
    }));
  
    // Update manager for the specific user
    updateManager(userId, managerId, name, role);
  };

  const getusers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/users`, {
        withCredentials: true,
      });
      console.log('Fetched users:', response.data); // Log API response
      if (response.data.success) {
        setAllusers(response.data.users);
      } else {
        console.log('Error fetching users:', response.data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

 

  const getManagerUsers = async () => {
    const response = await axios.get(`${url}/api/user/assigned/${loginId}`, {
      withCredentials: true,
    });
    console.log('Fetched assigned users:', response.data); // Log API response
    if (response.data.success) {
      setAllusers(response.data.users);
      console.log(response.data.users)
     
    }
    setMessage(response.data.message);
  };

  const getTaskId = async (id) => {
   setManagerAssignedUserId(id)
    console.log(id)
    
    const response = await axios.get(`${url}/api/task/getmanagertasks/${id}`, {
      withCredentials: true
    })
    console.log(response)
    if (response.data.success) {
      setManagerloading(false)
      setUsertasks(response.data.tasks)
      console.log(response.data.tasks)
     
      navigate('/Dashboard/tasks')
    }else{
    setTaskMessage(response.data.message);
    console.log(taskMessage)
    }
    navigate('/Dashboard/tasks')
  }

  useEffect(() => {
    if (user === 'admin') {
      getusers();
      getmanagers();
    }
    if (user === 'manager') {
      getManagerUsers();
    }
  }, [user]);
if(Managerloading){
  
  if (!Allusers || Allusers.length === 0) { // Check if Allusers is defined and has no length
    return (
      <Typography>{message || "No users found"}</Typography>
    );
  }
}

  return (
    <div>
      <TableContainer component={Paper} sx={{ height: '80vh' }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='bg' align="right">Name</TableCell>
              <TableCell className='bg' align="right">Email</TableCell>
              <TableCell className='bg' align="right">Role</TableCell>

              {user == 'manager' ? null : (<>
                <TableCell className='bg' align="right">Assigned Manager</TableCell>
                <TableCell className='bg' align="right">Change Manager</TableCell>
              </>)}
              <TableCell className='bg' align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {Allusers && Allusers.length > 0 ? (
    Allusers.map((User) => (
      <TableRow key={User._id}> {/* Changed user._id to User._id */}
        <TableCell align="right">{User.name}</TableCell>
        <TableCell align="right">{User.email}</TableCell>
        <TableCell align="right">{User.role}</TableCell>
        {user === 'manager' ? (
          <TableCell align="right">
            <Button variant='outlined' onClick={() => getTaskId(User._id)} size='small' color='yellow'>View tasks</Button>
          </TableCell>
        ) : (
          <>
            <TableCell align="right">
              {User.assigned && User.assigned.length > 0 ? (
                User.assigned.map((manager) => (
                  <div key={manager._id}>
                    {manager.name} ({manager.role})
                  </div>
                ))
              ) : (
                <Typography>No Managers Assigned</Typography>
              )}
            </TableCell>
            <TableCell align="right">
              <InputLabel id={`select-manager-${User._id}`}>Manager</InputLabel>
              <Select
                labelId={`select-manager-${User._id}`}
                id={`select-manager-${User._id}`}
                value={selectedManagers[User._id] || ''}
                label="Manager"
                onChange={(event) => handleManagerChange(event, User._id)}
              >
                {managers && managers.length > 0 ? ( // Check if managers is defined and an array
                  managers.map((manager) => (
                    <MenuItem key={manager._id} value={manager}>
                      {manager.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Managers Available</MenuItem> // Handle case when no managers are available
                )}
              </Select>
            </TableCell>
            <TableCell align="right">
              <DeleteForeverOutlinedIcon
                sx={{ color: 'tomato', cursor: 'pointer' }}
                onClick={() => deleteuser(User._id)}
              />
            </TableCell>
          </>
        )}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} align="center">{message || "No users found"}</TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}
