import React, { useContext, useEffect, useState } from 'react'
// import { StoreContext } from '../Context/Storecontext'
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { CircularProgress } from '@mui/material';
import { StoreContext } from '../Context/Storecontext';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Addtask from './Addtask';
import Updatetask from './Updatetask';
// import axios from 'axios';
// import { toast } from 'react-toastify';

export default function TaskTable() {
    const {
        url,
        Usertasks,
        setUsertasks,
        gettasks,
        user,
        GetAllTasks,
        taskMessage,
        
    } = useContext(StoreContext)
    const [open, setOpen] = useState(false);
    const [Open, setOpenEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const update = (item) => {
        setSelectedItem(item); // Set the selected item to edit
        setOpenEdit(true)
    }

    const Dlttask = async (id) => {
        const response = await axios.delete(`${url}/api/task/delete/${id}`, {
            withCredentials: true
        })
        if (response.data.success) {
            setUsertasks(Usertasks.filter(item => item._id !== id));
        }
        console.log('no response')
    }
    useEffect(() => {
        if (user == 'user') {
            gettasks()
        }
        if (user == 'admin') {
            GetAllTasks()
        }
        
    }, [])

    // if (!Usertasks || Usertasks.length === 0) { // Check if Allusers is defined and has no length
    //     return (
    //       <Typography>{taskMessage || "No users task found"}</Typography>
    //     );
    //   }
    return (
        <div>
            <Box>
                <Addtask open={open} setopen={setOpen} />
                <Updatetask Open={Open} setOpenEdit={setOpenEdit} setUsertasks={setUsertasks} selectedItem={selectedItem} gettasks={gettasks} />
                {user == 'manager' ? null : (
                    <Button className='mb-2' size="small" variant="outlined" onClick={handleClickOpen}>
                        Add data
                    </Button>
                )}
                <TableContainer component={Paper} sx={{ height: '80vh' }} >
                    <Table stickyHeader sx={{ minWidth: 650, background: 'red', }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='bg' align="right">Title</TableCell>
                                <TableCell className='bg' align="right">Description</TableCell>
                                <TableCell className='bg' align="right">Due date</TableCell>
                                <TableCell className='bg' align="right">Status</TableCell>
                                <TableCell className='bg' align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ position: 'relative', overflow: 'auto' }}>
                            {!Usertasks || Usertasks.length === 0? (<><Typography>{taskMessage || "No users task found"}</Typography></>) :null}
                            {Usertasks.map((task) => (
                                <>
                                    <TableRow
                                        key={task._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell sx={{ background: 'white' }} align="right">{task.title}</TableCell>
                                        <TableCell sx={{ background: 'white' }} align="right">
                                            {task.description}
                                            {/* <AddOutlinedIcon onClick={() => incQuantity(item)} sx={{ color: 'red', marginTop: '7px', cursor: 'pointer' }} />
                                      <Typography mt={1}> {item.quantity} </Typography>
                                      <RemoveOutlinedIcon onClick={() => decQuantity(item)} sx={{ color: 'red', marginTop: '7px', cursor: 'pointer' }} /> */}
                                        </TableCell>
                                        <TableCell sx={{ background: 'white' }} align="right">{task.dueDate}</TableCell>
                                        <TableCell sx={{ background: 'white' }} align="right">{task.status}</TableCell>
                                        <TableCell sx={{ background: 'white' }} align="right">
                                            {user !== 'manager' ? (
                                                <DeleteForeverOutlinedIcon
                                                    onClick={() => Dlttask(task._id)}
                                                    sx={{
                                                        color: 'tomato',
                                                        cursor: 'pointer',
                                                    }} />
                                            ) : null}
                                            <EditIcon
                                                onClick={() => update(task)}
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
            </Box>
        </div>
    )
}
