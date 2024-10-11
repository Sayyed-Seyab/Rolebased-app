import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { StoreContext } from '../Context/Storecontext';
import axios from 'axios';
export default function UserAlert({dltTaskId, getusers}) {
    console.log(dltTaskId)
    const {
        url,
        user,
         open,
        setOpen,} = useContext(StoreContext)
    const handleClose = () => {
        setOpen(false);
      };

    
      const DltUserWithTasks = async() => {
        if(dltTaskId){
      const response = await axios.delete(`${url}/api/task/deleteusertasks/${dltTaskId}`, {
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
      const UserdltResponse = await axios.delete(`${url}/api/user/delete/${dltTaskId}`,{
        withCredentials:true
      })
      console.log(UserdltResponse.data)
      if(UserdltResponse.data.success){
        alert(UserdltResponse.data.Message)
        getusers()
        setOpen(false);
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
          {"Are you sure delete user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             All tasks associated with this user will be deleted automatically
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={DltUserWithTasks} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </div>
  )
}
