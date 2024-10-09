import { Divider, List, ListItem, ListItemButton, ListItemText, Paper, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../Context/Storecontext';
import './style.css';

export default function Sidebar() {
  const { user } = useContext(StoreContext);
  
  return (
    <Paper className='Sidebar'>
      <Toolbar />
      <Divider />
      <List>
        {user !== 'user' && user !== 'manager' && (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to='Dashboard/add'>
                <ListItemText primary='Add' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to='Dashboard/managers'>
                <ListItemText primary='Managers' />
              </ListItemButton>
            </ListItem>
          </>
        )}
        
        {user !== 'user' && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to='Dashboard/users'>
              <ListItemText primary='Users' />
            </ListItemButton>
          </ListItem>
        )}

        {user !== 'manager' && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to='Dashboard/tasks'>
              <ListItemText primary='Tasks' />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
    </Paper>
  );
}
