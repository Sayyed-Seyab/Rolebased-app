import express from 'express'
import { Adduser, Getusers, Getuser, loginUser,findrole, logout, Getmanagers, Deleteuser,Updateuser,Deletemanager, GetAssignedusers, GetManagerUsersAndUnAssigned } from '../Controllers/UserController.js';
import { ismanager,isadmin, isuser} from '../Middleware/verifyToken.js';

const UserRouter = express.Router()

// Define routes
UserRouter.post('/login',loginUser);
UserRouter.get('/role', findrole);
UserRouter.post('/logout',logout);
UserRouter.post('/add',isadmin, Adduser);
UserRouter.get('/users',isadmin, Getusers)
UserRouter.get('/user/:id',isuser, Getuser)
UserRouter.get('/assigned/:id',ismanager, GetAssignedusers)
UserRouter.post('/update/:id',isadmin, Updateuser);
UserRouter.delete('/deletemanagerusers/:id',isadmin, GetManagerUsersAndUnAssigned );
UserRouter.delete('/delete/:id',isadmin, Deleteuser);
UserRouter.get('/managers',isadmin, Getmanagers)
UserRouter.delete('/deletemanager/:id',isadmin,Deletemanager)


// Correctly export the UserRouter
export default UserRouter;
