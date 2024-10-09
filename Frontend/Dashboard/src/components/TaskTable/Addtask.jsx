import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { StoreContext } from '../Context/Storecontext';
import axios from 'axios';

export default function Addtask({ open, setopen, setdata }) {
  const { user, loginId, url } = useContext(StoreContext);
  const [value, setvalue] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
    createdBy: loginId,
    updatedby:loginId,
    // assignedmanager: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    dueDate: false,
    status: false
  });

  const handleClose = () => {
    setopen(false);
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

  const handleSubmit = async () => {
    const newErrors = {
      title: !value.title,
      description: !value.description,
      dueDate: !value.dueDate,
      status: !value.status
    };

    setErrors(newErrors);

    // If there are no errors, proceed with submission
    if (!Object.values(newErrors).includes(true)) {
      setvalue({
        ...value,
        createdBy: loginId,
        updatedby:loginId,
      });
      console.log('Form submitted:', value);
      if(loginId){
      try {
       
        const response = await axios.post(`${url}/api/task/add`, value, {
          withCredentials: true
        });
        if (response.data.success) {
          console.log(response.data);
          setopen(false);
          // Reset form fields after successful submission
          setvalue({
            title: '',
            description: '',
            dueDate: '',
            status: '',
            createdBy: '',
            assignedmanager: '',
            updatedby:''
          });
       } else {
          console.log('Submission failed:', response.data);
        }
      } catch (error) {
        console.error('API error:', error);
      }
    } else {
      console.log('Form has errors');
    }
  }

  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="add-task-dialog-title">
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
        <Button onClick={handleSubmit} variant="contained">Add Task</Button>
      </Box>
    </Dialog>
  );
}
