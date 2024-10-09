import { useContext, useState } from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Adduser from './Pages/Addusers/Adduser';
import Managers from './Pages/Managers/Managers';
import User from './Pages/Users/User';
import Login from './Pages/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardNav from './components/Navbar/DashboardNav';
import { Grid, Box, CircularProgress } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import Task from './Pages/Tasks/Task';
import { StoreContext } from './components/Context/Storecontext';
import AdminAuth from './components/UserAuth/AdminAuth';
import ManagerAuth from './components/UserAuth/ManagerAuth';

function App() {
  const { user, getroleLoader } = useContext(StoreContext); // Getting user and loader states from context

  if (getroleLoader) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height to center the loader
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {!user ? (
        // If user is not logged in, show the login page
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect all unknown routes to "/" */}
        </Routes>
      ) : (
        // If user is logged in, show the dashboard and other routes
        <Box>
          <Grid container gap={7}>
            <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
              <Sidebar />
            </Grid>

            <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
              <DashboardNav />
              <Box mt={3}>
                <Routes>
                  <Route element={<AdminAuth/>}>
                  <Route path="/Dashboard/add" element={<Adduser />} />
                  <Route path="/Dashboard/managers" element={<Managers />} />
                  </Route>
                  <Route element={<ManagerAuth/>}>
                  <Route path="/Dashboard/users" element={<User />} />
                  </Route>
                  <Route path="/Dashboard" element={<Home />} />
                  <Route path="/Dashboard/tasks" element={<Task />} />
                  <Route path="*" element={<Navigate to="/Dashboard" />} /> {/* Catch-all to redirect to Dashboard */}
                </Routes>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default App;
