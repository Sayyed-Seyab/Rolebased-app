import express from 'express';
import {  isadmin, isAuthorizeduser, ismanager, isuser, isuserAndadmin } from '../Middleware/verifyToken.js';
import { Addtask, Updatetask, Deletetask,Gettasks, GetAlltasks,GetManagertasks } from '../Controllers/TaskController.js';


const TaskRouter = express.Router();
TaskRouter.post('/add',isuser,Addtask)
TaskRouter.post('/update/:id',isAuthorizeduser,Updatetask)
TaskRouter.delete('/delete/:id',isuserAndadmin,Deletetask)
TaskRouter.get('/get',isAuthorizeduser,Gettasks)
TaskRouter.get('/get/:id',ismanager,GetManagertasks)
TaskRouter.get('/getall',isadmin,GetAlltasks)

// Correctly export the UserRouter
export default TaskRouter;