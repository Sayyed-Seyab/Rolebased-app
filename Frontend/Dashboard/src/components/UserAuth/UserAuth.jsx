
import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, Outlet } from 'react-router-dom';
import { StoreContext } from '../Context/Storecontext';

export default function UserAuth() {
    const [loading, setLoading] = useState(true);
    const {user} = useContext(StoreContext);

    useEffect(() => {
        // Simulating an async check, you can replace it with actual async operations if needed
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the delay as per your needs
    }, [user]);

    if (loading) {
        // Render a loading component or spinner
        return  <Box 
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
        <CircularProgress />
    </Box>
    }

    // Once loading is complete, check the user's role and navigate accordingly
   if( user == 'admin' || user == 'manager' || user == 'user'){
    return  <Outlet />  ;
   }else{
   return  <Navigate to="/Dashboard" />
   }
   
}
