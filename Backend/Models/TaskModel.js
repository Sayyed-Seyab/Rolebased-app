import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: {
     type: String,
      required: true
     },
  description: {
     type: String,
      required: true
     },
  dueDate: {
     type: Date,
      required: true
     },
  status: {
     type: String,
      enum: ['pending', 'in-progress', 'completed'],
       default: 'pending'
       },
  createdBy: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
       required: true
       },
  assignedmanager: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'manager' 
    }, 
  updatedby:{
   type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
     required: true
     },
});

const TaskModel = mongoose.model.Tasks || mongoose.model('Tasks', taskSchema);
export default TaskModel;
