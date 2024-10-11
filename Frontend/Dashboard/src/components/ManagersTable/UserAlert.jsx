import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { StoreContext } from '../Context/Storecontext';
import axios from 'axios';
export default function UserAlert({ open,setOpen,getManagers,managerId}) {
   
    console.log(managerId)
    const {
        url,
        user,
     } = useContext(StoreContext)
    const handleClose = () => {
        setOpen(false);
      };

    
      const DltUserWithManger = async() => {
        if(managerId){
      const response = await axios.delete(`${url}/api/user/deletemanagerusers/${managerId}`, {
        withCredentials: true
      })
      console.log(response.data)
      if(response.data.success){
       alert(response.data.message)
      }
      if(!response.data.success){
        setOpen(false);
       alert(response.data.message)
      }
      console.log('no response')
      const DltManagerresponse = await axios.delete(`${url}/api/user/deletemanager/${managerId}`, {
          withCredentials: true, // Ensure cookies are sent and stored
        });
        if (DltManagerresponse.data.success) {
             alert(response.data.message)
          getManagers();
          setOpen(false);
        } else {
          console.log('Error deleting Manager');
        }
     
    }
      };
  return (
    <div>
         <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure delete Manager?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             All users associated with this manager will be unassigned automatically
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={DltUserWithManger} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </div>
  )
}

