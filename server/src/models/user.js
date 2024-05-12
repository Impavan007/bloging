import mongoose  from "mongoose";
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    userName: { type: String, required: [true, 'Please provide a unique userName'], unique: true },
    email: { type: String, required: [true, 'Please provide a unique email-id'], unique: true },
    password: { type: String },
    followers:{type:Number,default:0},
    following:{type:[String],default:0},
    verified:{type:Boolean , default : false},
    imgUrl:{type:String}
}, { timestamps: true }); 



const User = mongoose.model('User', userSchema);

export default User;