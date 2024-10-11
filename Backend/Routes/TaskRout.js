import express from 'express';
import {  isadmin, isAuthorizeduser, ismanager, isuser, isuserAndadmin } from '../Middleware/verifyToken.js';
import { Addtask, Updatetask, Deletetask,Gettasks, GetAlltasks,GetManagertasks, GetUsertasksAndDlt } from '../Controllers/TaskController.js';


const TaskRouter = express.Router();
TaskRouter.post('/add',isuser,Addtask)
TaskRouter.post('/update/:id',isAuthorizeduser, Updatetask)
TaskRouter.delete('/delete/:id',isuserAndadmin, Deletetask)
TaskRouter.get('/get/:id',isuser, Gettasks)
TaskRouter.get('/getmanagertasks/:id',ismanager, GetManagertasks)
TaskRouter.delete('/deleteusertasks/:id',isadmin, GetUsertasksAndDlt)
TaskRouter.get('/getall',isadmin, GetAlltasks)

// Correctly export the UserRouter
export default TaskRouter;