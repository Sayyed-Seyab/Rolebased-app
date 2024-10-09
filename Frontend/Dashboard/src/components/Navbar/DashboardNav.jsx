import React, { useContext, useEffect, useState } from 'react'
import AdbIcon from '@mui/icons-material/Adb';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Paper, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import { StoreContext } from '../Context/Storecontext';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';
// import jwtEncode from 'jwt-encode';
import './style.css';
import { StoreContext } from '../Context/Storecontext';
import axios from 'axios';

export default function DashboardNav() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {
    url,
    setuser,
    Usertasks,
    setUsertasks,
    gettasks,
    user,
   } = useContext(StoreContext)

  const logout = async () => {
    try {
      const response = await axios.post(`${url}/api/user/logout`, {}, {
        withCredentials: true, // Ensure cookies are sent and cleared by the server
      });
      if (response.data.success) {
        alert(response.data.message);
        setuser(null)
        navigate('/'); // Redirect to home or login after logout
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const AdminLogout = () => {
    // localStorage.removeItem('token');
    // handleCloseUserMenu();
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   setUser(null)
    //   setRole(null)
    // }
  }


  const filteredusers = (e) => {
    const value = e.target.value


    if (value) {
      const search = Usertasks.filter(item =>
        item.status.toLowerCase().includes(value.toLowerCase()))
      setUsertasks(search)
      console.log(search)
      if(search.length == 0){
        const search = Usertasks.filter(item =>
          item.dueDate.toLowerCase().includes(value.toLowerCase()))
        setUsertasks(search)
      }
    } else {
      gettasks();

    }
  }
    return (
      <div>
        <AppBar className='nav' position="static" sx={{ background: 'none', color: 'gray', boxShadow: 'none' }}>
          <Container component={Paper} maxWidth="xl" >
            <Toolbar >
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex', color: 'red' }, mt: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'red',
                    textDecoration: 'none',
                  }}
                >
                  FoOD
                </Typography>
              </Box>





              <Box sx={{ flexGrow: 0 }}>

                <Box sx={{ display: 'flex', gap: '20px' }}>
                {user !== 'user'? null:(<>
                  <Box>
                    <SearchOutlinedIcon sx={{
                      fontSize: '30px',
                      marginTop: '5px',
                      '&:hover': {
                        color: 'red',
                      },
                    }} />

                  </Box>
                  <Box>
                    {/* {DashboardAddfood || DashboardAstats ? null : (
                  Dashboardorders ? ( */}
                 
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Search by status or due date"
                      onChange={filteredusers}  // Function to filter food items
                      sx={{ width: '100%' }}
                    />
                    {/* )
                )} */}
                  </Box>
                  </>)}

                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    {/* <Box sx={{ position: 'absolute', top: '25px', right: '0px', zIndex: 2 }}>
                  <label htmlFor='image'>
                    <AddOutlinedIcon sx={{ background: 'white', cursor: 'pointer', fontSize: '15px', borderRadius: 10 }} />
                  </label>
                  <TextField
                    id='image'
                    type='file'
                    onChange={handleImageChange}
                    sx={{ display: 'none' }}
                  />
                </Box> */}
                    <Tooltip title="Open settings" >
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, }}>
                        {/* src={`${url}/images/`+UserImage} */}
                        {/* {UserImage ? <Avatar alt="Remy Sharp" src={`${url}/images/` + UserImage} /> : <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />} */}
                      </IconButton>
                    </Tooltip>
                    <Button onClick={logout} size='small' variant='outlined'>logout</Button>
                  </Box>

                </Box>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={AdminLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    )
  }
