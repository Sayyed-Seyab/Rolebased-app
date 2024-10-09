import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
     type: String,
      required: true
     },
  email:{
     type: String,
     required: true,
      unique: true 
    },
  password:{
     type: String,
     required: true
     },
  role: {
     type: String,
      // enum: ['admin', 'manager', 'user'],
      // default: 'user',
      // require:true,
    },
  assigned: [{ 
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // Manager ID
    name: { type: String }, // Manager's name
    role: { type: String }  // Manager's role
  }]})

const UserModel = mongoose.model.Users ||  mongoose.model('Users', userSchema);
export default UserModel;