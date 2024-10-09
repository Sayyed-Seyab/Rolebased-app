import express from 'express';
import {  isadmin, isAuthorizeduser, ismanager, isuser, isuserAndadmin } from '../Middleware/verifyToken.js';
import { Addtask, Updatetask, Deletetask,Gettasks, GetAlltasks,GetManagertasks } from '../Controllers/TaskController.js';


const TaskRouter = express.Router();
TaskRouter.post('/add',isuser,Addtask)
TaskRouter.post('/update/:id',isuser, Updatetask)
TaskRouter.post('/update/:id',isadmin, Updatetask)
TaskRouter.post('/update/:id',ismanager, Updatetask)
TaskRouter.delete('/delete/:id',isuserAndadmin, Deletetask)
TaskRouter.get('/get/:id',isuser, Gettasks)
TaskRouter.get('/get/:id',ismanager, GetManagertasks)
TaskRouter.get('/getall',isadmin, GetAlltasks)

// Correctly export the UserRouter
export default TaskRouter;