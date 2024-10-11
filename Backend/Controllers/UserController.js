import validator from "validator";
import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt';  // Corrected the import
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Function to create a token
const createToken = (id, name, role, assigned) => {
    return jwt.sign({ id, name, role, assigned }, process.env.JWT_SECRET);
}

// Password validation regex
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/;

const Adduser = async (req, res) => {
    try {
        const { name, email, password, role, assigned } = req.body;

        // Check if user already exists
        const exist = await UserModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, Message: 'User already exists' });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, Message: 'Please enter a valid email' });
        }
        
        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, Message: 'Password must be greater than 8' });
        }

        // Validate password against regex
        if (!passwordRegex.test(password)) {
            return res.json({ success: false, Message: 'Password must include an uppercase letter, a lowercase letter, a number, and a special character' });
        }

        // Validate name
        if (!name) {
            return res.json({ success: false, Message: 'Name field is required' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            role,
            assigned,
        });

        // Save user to database
        const user = await newUser.save();

        // Create a token
        const token = createToken(user._id, user.name, user.role, user.assigned); // Pass all necessary parameters
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, Message: 'Error occurred' });
    }
};


const loginUser = async(req, res)=>{
    const {email, password}= req.body;
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success:false, Message:'Invalid Email or Password'})
        }
        const Pass = await bcrypt.compare(password, user.password);
        if(!Pass){
           return res.json({success:false, Message:'Invalid credentials'})
        }
        const token = createToken(user._id, user.name, user.role)
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            maxAge:36000000,
            path: '/', // Set the path for the cookie
        })
       return res.json({success:true, token})
       
       
    }catch (error){
        console.log(error)
        res.json({success:false, Message:error})

    }
   

}
const findrole = async(req, res)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.json({success:false, message:'Unauthorized: no token provided'})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
       const user = await UserModel.findById(decode.id)
       return res.json({success:true, role:user.role, id:user._id})
    } catch(error){
       console.log(error)
    }
}

const logout = async(req, res)=>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: false, // Must match how the cookie was set
            path: '/', // Ensure path matches when the cookie was set
        })
        return res.json({success:true, message:'Logout successfully'})
    }catch(error){
       return res.json({success:false, message:error})
    }
}

const Getusers = async(req, res)=>{
    try{
        const users = await UserModel.find({ role: 'user' })
        // .populate('assigned','_id')
            .select('-password') // Exclude the password field
           // Populate assigned field with manager's details
        if(!users){
           return res.status(404).json({success:false, Message:'users  not found'})
        } 
        res.status(200).json({success:true, users})
    }catch (error){
        return res.json({success:false, message:error})
    }
}

const GetAssignedusers = async(req, res)=>{
    try{
        const id = req.params.id
        console.log(id)
        const users = await UserModel.find({
            role: 'user',
            assigned: { $elemMatch: { id: id } } // Use $elemMatch to match an object in the array
          }).select('-password');
        if (users.length === 0) {
            return res.json({ success: false, message: 'You have no assigned users' });
          }
       return res.status(200).json({success:true, users})
    }catch (error){
        return res.json({success:false, message:"error"})
    }
}
// Getmanagers
const Getmanagers = async(req, res)=>{
    try{
        const users = await UserModel.find({role: 'manager'}).select('-password');
        if(!users){
           return res.status(404).json({success:false, Message:'Food not found'})
        } 
        res.status(200).json({success:true, users})
    }catch (error){
        return res.json({success:false, message:error})
    }
}
const  Getuser = async(req, res)=>{
    try{
        const _id = req.params.id;
        console.log(_id)
        const user = await UserModel.findById(_id);
        if(!user ){
            return res.status(404).json({success:false, Messaage:'User not found'})
        }
       return  res.status(200).json({success: true, Message:user})
    }catch(error){
        console.log(error);
        return res.status(500).json({success: false, Message:'Internal server error'})

    }
}
//DeleteFood
const Deleteuser = async(req, res)=>{
    try{
        const id = req.params.id;
        console.log(id)
        const user = await UserModel.findById(id);
        if(!user ){
            return res.status(404).json({success:false, Messaage:'User not found'})
        }
        await UserModel.findByIdAndDelete(id);
       return  res.status(200).json({success: true, Message:'User deleted successfully'})
    }catch(error){
        console.log(error);
        return res.status(500).json({success: false, Message:'Internal server error'})

    }
}

// Updateuser
const Updateuser = async(req, res)=>{
    try {
        const { _id, assigned } = req.body;
    
        // Find the user and update the 'assigned' field, returning the updated document
        const updateStatus = await UserModel.findByIdAndUpdate(
          _id,
          { assigned: assigned },
          { new: true } // This ensures the updated document is returned
        );
    
        if (updateStatus) {
          res.json({ success: true, Message: "User assigned successfully", data: updateStatus });
        } else {
          res.json({ success: false, Message: 'User not found' });
        }
      } catch (error) {
        console.log(error);
        res.json({ success: false, Message: 'Error' });
      }
}
const GetManagerUsersAndUnAssigned = async (req, res) => {
    try {
        // Assuming you have a middleware that verifies the token and sets req.user
        const id = req.params.id; // Get the logged-in manager ID
        console.log(id)
        // Query to find users where the logged-in manager is the creator
        const users = await UserModel.find({ 'assigned.id': id });
         // If no users are found, return 404
         if (!users || users.length === 0) {
            return res.json({ success: false, message: 'No users found for this Manager' });
        }
         // Set id, name, and role to an empty string for each assigned user
         await UserModel.updateMany(
            { assigned: null },
           
        );


        // Return the users created by the user
        return res.json({ success: true, users, message: 'Users  deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
// Deletemanager
const Deletemanager = async(req, res)=>{
    try{
       const { id } = req.params; // Assuming the ID is passed in the request parameters
    const users = await UserModel.find({ assigned: { $elemMatch: { id: id } } });

    if (!users) {
      return res.status(404).json({ success: false, message: 'No users found with the assigned manager' });
    }

     // Update users to remove the manager from the assigned field
   const romoveManager =   await UserModel.updateMany(
        { assigned: { $elemMatch: { id: id } } }, // Match users with the assigned manager
        { $pull: { assigned: { id: id } } } // Use $pull to remove the manager from assigned
      );

    //   if(romoveManager){
    //     return res.status(200).json({ success: true, romove: romoveManager, message:'Assigned users are removed' });
    //   }
        const user = await UserModel.findById(id);
        if(!user ){
            return res.status(404).json({success:false, messaage:'Manager not found'})
        }
        await UserModel.findByIdAndDelete(id);
       return  res.status(200).json({success: true, message:'Manager deleted successfully'})
    }catch(error){
        console.log(error);
        return res.status(500).json({success: false, message:'Internal server error'})

    }
}


export { Adduser, loginUser,findrole, logout,Getusers,Getuser, GetAssignedusers, Getmanagers,Deleteuser,Updateuser,GetManagerUsersAndUnAssigned ,Deletemanager};
