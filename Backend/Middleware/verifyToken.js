import jwt from 'jsonwebtoken'
import UserModel from '../Models/UserModel.js'

const findrole = async(req, res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.json({success:false, message:'Unauthorized: no token provided'})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
       const user = await UserModel.findById(decode.id)
       if(!user){
        return res.json({success:false, message:'user not fount'})
       }
       req.user=user
       next()
    } catch(error){
       console.log(error)
    }
}

const isadmin = async(req, res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.json({success:false, message:'Unauthorized: no token provided'})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
       const user = await UserModel.findById(decode.id)
       if(!user){
        return res.json({success:false, message:'user not fount'})
       }
       if(user.role !== 'admin' ){
        return res.json({success:false, message:'Unauthorized user'})
       }
       req.user=user
       next()
    } catch(error){
       console.log(error)
    }
}

const isuserAndadmin = async(req, res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.json({success:false, message:'Unauthorized: no token provided'})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
       const user = await UserModel.findById(decode.id)
       if(!user){
        return res.json({success:false, message:'user not fount'})
       }
       if(user.role !== 'admin' && user.role !== 'user'){
        return res.json({success:false, message:'Unauthorized user'})
       }
       req.user=user
       next()
    } catch(error){
       console.log(error)
    }
}

const isadminAndmanager = async(req, res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.json({success:false, message:'Unauthorized: no token provided'})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
       const user = await UserModel.findById(decode.id)
       if(!user){
        return res.json({success:false, message:'user not fount'})
       }
       if(user.role !== 'manager' || user.role !== 'admin'){
        return res.json({success:false, message:'Unauthorized user'})
       }
       req.user=user
       next()
    } catch(error){
       console.log(error)
    }
}

const ismanager = async(req, res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.json({success:false, message:'Unauthorized: no token provided'})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
       const user = await UserModel.findById(decode.id)
       if(!user){
        return res.json({success:false, message:'user not fount'})
       }
       if(user.role !== 'manager'){
        return res.json({success:false, message:'Unauthorized user'})
       }
       req.user=user
       next()
    } catch(error){
       console.log(error)
    }
}

// isuser
const isAuthorizeduser = async(req, res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.json({success:false, message:'Unauthorized: no token provided'})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
       const user = await UserModel.findById(decode.id)
       if(!user){
        return res.json({success:false, message:'user not fount'})
       }
       if(user.role !== 'manager' && user.role !== 'admin' && user.role !== 'user'){
        return res.json({success:false, message:'Unauthorized user'})
       }
       req.user=user
       next()
    } catch(error){
       console.log(error)
    }
}

const isAdmin = async(req, res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.json({success:false, message:'Unauthorized: no token provided'})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
       const user = await UserModel.findById(decode.id)
       if(!user){
        return res.json({success:false, message:'user not fount'})
       }
       if(user.role !== 'admin'){
        return res.json({success:false, message:'Unauthorized user'})
       }
       req.user=user
       next()
    } catch(error){
       console.log(error)
    }
}


const isuser = async(req, res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.json({success:false, message:'Unauthorized: no token provided'})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
       const user = await UserModel.findById(decode.id)
       if(!user){
        return res.json({success:false, message:'user not fount'})
       }
       if( user.role !== 'user'){
        return res.json({success:false, message:'Unauthorized user'})
       }
       req.user=user
       next()
    } catch(error){
       console.log(error)
    }
}



export {findrole, isadmin,isAdmin,isuserAndadmin, isuser,ismanager, isadminAndmanager,isAuthorizeduser}