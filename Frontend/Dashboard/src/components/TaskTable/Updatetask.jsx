import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/Storecontext';
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';

export default function Updatetask({ Open, setOpenEdit, setUsertasks, selectedItem, gettasks }) {
  const {
    user,
    loginId,
    url,
    GetAllTasks,
    GetManagerUsers
  } = useContext(StoreContext);
  const [value, setvalue] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
    assignedmanager: '',
    updatedby: loginId,

  });
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    dueDate: false,
    status: false
  });

  const handleClose = () => {
    setOpenEdit(false);
  };
  const handleOnChange = (e) => {
    setvalue({
      ...value,
      [e.target.name]: e.target.value
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: false // Clear error when field is updated
    }));
  };

  const UpdateTask = async () => {



    const response = await axios.post(`${url}/api/task/update/${selectedItem._id}`, value, {
      withCredentials: true
    })
    if (response.data.success) {
      console.log(response.data)
      if (user == 'user') {
        gettasks()
      }
      if (user == 'admin') {
        GetAllTasks()
      }
      if (user == 'manager') {
        GetManagerUsers()
        alert('manager')
      }
      setOpenEdit(false);
    }

    console.log('no response')
  }


  const createdby = async () => {
    const assigned = await axios.get(`${url}/api/user/user/${loginId}`, {
      withCredentials: true
    })
    if (assigned.data.success)
      if (assigned.data.Message.assigned.length > 0) {
        value.assignedmanager = assigned.data.Message
      }
    const updateby = {
      id: assigned.data.Message._id,
      name: assigned.data.Message.name,
      role: assigned.data.Message.role,
    }
    value.createdBy = updateby
    console.log(value)
  }
  useEffect(() => {
    if (selectedItem) {
      // createdby()
      setvalue({
        title: selectedItem.title,
        description: selectedItem.description,
        dueDate: selectedItem.dueDate,
        status: selectedItem.status,
        createdBy: loginId,
        assignedmanager: null,
        updatedby: loginId,
      });
    }
  }, [selectedItem]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <Dialog open={Open} onClose={handleClose} aria-labelledby="add-task-dialog-title">
        <DialogTitle id="add-task-dialog-title">{"Add Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="add-task-dialog-description">
            <Box sx={{ mt: 2 }}>
              {/* Title Field */}
              <TextField
                name="title"
                onChange={handleOnChange}
                value={value.title}
                fullWidth
                label="Title"
                variant="standard"
                error={errors.title}
                helperText={errors.title ? "Title is required" : ""}
                sx={{ mb: 3 }}
              />

              {/* Description Field */}
              <TextField
                name="description"
                onChange={handleOnChange}
                value={value.description}
                fullWidth
                multiline
                rows={4}
                label="Description"
                variant="standard"
                error={errors.description}
                helperText={errors.description ? "Description is required" : ""}
                sx={{ mb: 3 }}
              />

              {/* Due Date Field */}
              <TextField
                name="dueDate"
                type="date"
                onChange={handleOnChange}
                value={value.dueDate}
                fullWidth
                variant="standard"
                label="Due Date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={errors.dueDate}
                helperText={errors.dueDate ? "Due date is required" : ""}
                sx={{ mb: 3 }}
              />

              {/* Status Field */}
              <FormControl fullWidth variant="standard" error={errors.status} sx={{ mb: 3 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={value.status}
                  onChange={handleOnChange}
                >
                  <MenuItem value="pending">pending</MenuItem>
                  <MenuItem value="in-Progress">in-Progress</MenuItem>
                  <MenuItem value="completed">completed</MenuItem>
                </Select>
                {errors.status && <FormHelperText>Status is required</FormHelperText>}
              </FormControl>
            </Box>
          </DialogContentText>
        </DialogContent>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Button onClick={UpdateTask} variant="contained">Update Task</Button>
        </Box>
      </Dialog>
    </div>
  )
}
