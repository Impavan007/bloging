import mongoose from 'mongoose'

const dbConnect =()=> mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('MongoDB Connected...');
}).catch((error)=>console.log(error.message));

export default dbConnect;