import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Chip, Container, Paper, TextField } from '@mui/material';
import { Form, Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
// import axios from 'axios';
// import { toast } from 'react-toastify';
import './style.css'
import { StoreContext } from '../Context/Storecontext';
import axios from 'axios';

export default function Addusers() {
const {url} = useContext(StoreContext)
const [error, setError] = useState(null)
const [Adduser, setAdduerData] = useState({
    name:'',
    email:'',
    password:'',
    role:'',
    
})
// Form validation logic
const validateForm = () => {
    const { name, email, password, role } = Adduser;

    if (!name || !email || !password || !role) {
        setError('All fields are required');
        return false;
    }
    if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return false;
    }
    setError(null);
    return true;
};

const handlerChange = (event)=>{
    const {name, value} = event.target
    setAdduerData((prevdata)=>({
        ...prevdata,
        [name]: value 
    }))
}
    const OnSubmithandler = async(e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
     const response = await axios.post(`${url}/api/user/add`,Adduser, {
        withCredentials: true // Make sure cookies are sent and stored
    })
       if(response.data.success){
        console.log(response.data)
        alert('User added successfully')
       }     
      setError(response.data.Message)
    };

    useEffect(()=>{
        console.log(Adduser)
    },[Adduser])
    return (
        <div>
            <Box mt={2} component={Paper} sx={{ padding: 2 }}>
                <Typography sx={{ textAlign: 'center' }} component="h1" variant="h5">
                    Add User
                </Typography>
                <Container maxWidth="xs">
                    <Box component='form' onSubmit={OnSubmithandler}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ mt: 1 }}>
                                <TextField
                                    sx={{
                                        '& label': { color: 'gray' },
                                        '& label.Mui-focused': { color: 'blue' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'blue' },
                                            '&:hover fieldset': { borderColor: 'green' },
                                            '&.Mui-focused fieldset': { borderColor: 'blue' },
                                        },
                                    }}
                                    onChange={handlerChange}
                                    value={Adduser.name}
                                    size='small'
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name"
                                    name="name"
                                    autoComplete="Name"
                                    autoFocus
                                />

                                <TextField
                                    sx={{
                                        '& label': { color: 'gray' },
                                        '& label.Mui-focused': { color: 'blue' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'blue' },
                                            '&:hover fieldset': { borderColor: 'green' },
                                            '&.Mui-focused fieldset': { borderColor: 'blue' },
                                        },
                                    }}
                                    onChange={handlerChange}
                                    value={Adduser.email}
                                    size='small'
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />

                                <TextField
                                    sx={{
                                        '& label': { color: 'gray' },
                                        '& label.Mui-focused': { color: 'blue' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'blue' },
                                            '&:hover fieldset': { borderColor: 'green' },
                                            '&.Mui-focused fieldset': { borderColor: 'blue' },
                                        },
                                    }}
                                    onChange={handlerChange}
                                    value={Adduser.password}
                                    size='small'
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />

                                <InputLabel id="demo-simple-select-label">User role</InputLabel>
                                <Select
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'blue' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'green' },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'blue' },
                                    }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Adduser.role}
                                    label="role"
                                    name='role'
                                    fullWidth
                                    onChange={handlerChange}
                                    required
                                >


                                    <MenuItem value={'manager'}>Manager</MenuItem>
                                    <MenuItem value={'user'}>User</MenuItem>
                                </Select>


                                <Box sx={{ textAlign: 'center' }}>
                                    <Chip
                                        className='btn'
                                        type="submit"
                                        label='Add user'
                                        variant="outlined"
                                        clickable
                                        onClick={OnSubmithandler}
                                        sx={{ mt: 3, mb: 2 }}
                                    />
                                </Box>
                                {error && <div style={{ color: 'red',textAlign: 'center' }}>{error}</div>}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}
