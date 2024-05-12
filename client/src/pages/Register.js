import React from 'react'
import { useState } from 'react'
import '../styles.css/Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Register = ({setshow}) => {
    const [data, setdata] = useState({email:'',password:''});
    const handleChange=({currentTarget:input})=>{
        setdata({...data,[input.name]:input.value})
     
    }
    const [message, setmessage] = useState("");
    const [error, seterror] = useState("")
const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        const url = "auth/signup";
        console.log(data);
        const res= await axios.post(url,data);
        setmessage(res.message);
        alert("email sent to your email id please check your email and verify");
        console.log(res.message);
        setshow(0);
    } catch (error) {
        console.log(error.message);
        seterror(error.message);
    }
}


  return (
    <div className='register'>
    <div className='container-1 '>
           <div className='head'>   <span className='close' onClick={()=>setshow(0)} style={{cursor:"pointer"}}>X</span> </div>
        <div className='form text-2xl  flex items-center flex-col  justify-center w-full'>
        <h1 className='text-bold' style={{fontSize:"6vw"}}>hello welcome </h1>
            <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col'>
            <div className='inputDiv'>
                <label className='userLabel'  htmlFor='userName'>userName</label><br/>
                    <input type='text' placeholder='enter your userName'id='userName' value={data.userName} name='userName' required className='inputStyles' onChange={handleChange}/>  
                </div>
            <div className='inputDiv'>
                <label className='userLabel'  htmlFor='email'>Email</label><br/>
                    <input type='email' placeholder='enter your email'id='email' value={data.email} name='email' required className='inputStyles' onChange={handleChange}/>  
                </div>
                <div className='inputDiv'>
                <label className='userLabel'  htmlFor='password'>password</label><br/>
                    <input type='text' placeholder='enter your password'id='password' value={data.password} name='password' required className='inputStyles' onChange={handleChange}/>  
                </div>
                <button type='submit'  className='LoginButton'>Register</button>
               
                {error&&<div style={{backgroundColor:"red",color:"white"}}>{error}</div>}
                {message&&<div className='bg-green text-2xl text-white'>{message}</div>}
            </form>
            
        </div>
    </div>
    </div>
  )
}

export default Register