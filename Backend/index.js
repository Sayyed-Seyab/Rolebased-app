import express from 'express';
import Db from './Config/Config.js';
import UserRouter from './Routes/UserRoute.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import TaskRouter from './Routes/TaskRout.js';
import cors from 'cors';


const app = express()
const port = process.env.PORT || 4000;
Db();

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true // Allow credentials (cookies) to be sent
}))


console.log('hellolk')
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', UserRouter)
app.use('/api/task', TaskRouter)

app.get('/', (req, res)=>{
    res.send('API is working');
})

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`)
})