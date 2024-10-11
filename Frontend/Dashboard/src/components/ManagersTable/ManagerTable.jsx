import React, { useContext, useEffect, useState } from 'react'
// import { StoreContext } from '../Context/Storecontext'
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {CircularProgress } from '@mui/material';
import { StoreContext } from '../Context/Storecontext';
import axios from 'axios';
import UserAlert from './UserAlert';
// import axios from 'axios';
// import { toast } from 'react-toastify';

export default function ManagerTable() {
    const {url} = useContext(StoreContext);
    const [AllManagers, setAllManagers] = useState([])
    const [managerId, setmanagerId] = useState(null)
    const [open,setOpen] = useState(false)
    const getManagers = async ()=>{
        const response = await axios.get(`${url}/api/user/managers`,{
            withCredentials:true
        })
        if(response.data.success){
            console.log(response.data)
            setAllManagers(response.data.users)
        }
        console.log('no response')
    }

    const deletmanager = async (id) => {
        setmanagerId(id)
        setOpen(true)
        // const response = await axios.delete(`${url}/api/user/deletemanager/${id}`, {
        //   withCredentials: true, // Ensure cookies are sent and stored
        // });
        // if (response.data.success) {
        //     // console.log(response.data)
        //   setAllManagers(AllManagers.filter((manager) => manager._id !== id));
        // } else {
        //   console.log('Error deleting user');
        // }
      };
    useEffect(()=>{
        getManagers()
    },[])
  return (
    <div>
        <UserAlert open={open}  setOpen={setOpen} getManagers={getManagers} managerId={managerId}/>
        <TableContainer component={Paper} sx={{ height: '80vh' }} >
                    <Table stickyHeader sx={{ minWidth: 650, background: 'red', }} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell className='bg' align="right">Name</TableCell>
                                <TableCell className='bg' align="right">Email</TableCell>
                                <TableCell className='bg' align="right">Role</TableCell>
                                <TableCell className='bg' align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ position: 'relative', overflow: 'auto' }}>
                            {AllManagers.map((manager) => (
                                <>
                                 <TableRow
                                  // key={item._id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                 
                                  <TableCell sx={{ background: 'white' }} align="right">{manager.name}</TableCell>
                                  <TableCell sx={{ background: 'white'}} align="right">
                                     {manager.email}
                                      {/* <AddOutlinedIcon onClick={() => incQuantity(item)} sx={{ color: 'red', marginTop: '7px', cursor: 'pointer' }} />
                                      <Typography mt={1}> {item.quantity} </Typography>
                                      <RemoveOutlinedIcon onClick={() => decQuantity(item)} sx={{ color: 'red', marginTop: '7px', cursor: 'pointer' }} /> */}
                                  </TableCell>
                                  <TableCell sx={{ background: 'white' }} align="right">{manager.role }</TableCell>
                                  <TableCell sx={{ background: 'white' }} align="right">
                                      <DeleteForeverOutlinedIcon
                                       onClick={() => deletmanager(manager._id)}
                                          sx={{
                                              color: 'tomato',
                                              cursor: 'pointer',
                                          }} />
                                  </TableCell>
                              </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    </div>
  )
}
