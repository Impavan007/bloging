import React from 'react'
import { useState } from 'react'
import '../styles.css/Register.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginfailure } from '../Redux/userSlice'
import { auth,provider } from '../Firebase'
import { signInWithPopup } from 'firebase/auth'
import { FcGoogle } from "react-icons/fc";





const Login = ({setshow}) => {
    const navigate = useNavigate()
    const [data, setdata] = useState({email:'',password:''});
    const handleChange=({currentTarget:input})=>{
        setdata({...data,[input.name]:input.value})
     
    } 
    const dispatch = useDispatch();
    const [error, seterror] = useState("")
const handleSubmit=async(e)=>{
    e.preventDefault();
    dispatch(loginStart())
    try {
        const url = "auth/signIn";
        console.log(data);
        const res= await axios.post(url,data);
        dispatch(loginSuccess(res.data))
        console.log(res.message);
        navigate('/');
        alert("user loggedin successfully");
        setshow(0);

    } catch (error) {
        dispatch(loginfailure())
        console.log(error.message);
        seterror(error.message);
    }
}
const signInWithGoogle= async(e)=>{
    e.preventDefault();
    dispatch(loginStart());
    await signInWithPopup(auth,provider).then((result)=>{
      axios.post('auth/google',{
        userName:result.user.displayName,
        email:result.user.email,
        imgUrl:result.user.photoURL
      }).then((res)=>{
        dispatch(loginSuccess(res.data))
       setshow(0);
      })
    })
    .catch((error)=>dispatch(loginfailure(error.message)));
  }
  return (
    <div className='register'>
    <div className='container-1 '>
        <div className='head'><span className='close' onClick={()=>setshow(0)} style={{cursor:"pointer"}}>X</span></div>
        <div className='form text-2xl m-10 flex items-center  justify-center flex-col w-full'>
        <h1 className='text-bold ' style={{fontSize:"6vw"}}>hello welcome </h1>
            <form onSubmit={handleSubmit}>
            <div className='email'>
                <label className='userLabel'  htmlFor='email'>Email</label><br/>
                    <input type='email' placeholder='enter your email'id='email' value={data.email} name='email' required className='inputStyles' onChange={handleChange}/>  
                </div><br/>
                <div className='password'>
                <label className='userLabel'  htmlFor='password'>password</label><br/>
                    <input type='text' placeholder='enter your password'id='password' value={data.password} name='password' required className='inputStyles' onChange={handleChange}/>  
                </div><br/>
               
                
                <button type='submit'  className='LoginButton'>Login</button>
                <center><h3>Or</h3></center>
                <button className='LoginButton' onClick={signInWithGoogle}><FcGoogle/>oogle</button>
                {error&&<div className='bg-red text-2xl text-white'>{error}</div>}
            </form>
            
        </div>
    </div>
    </div>
  )
}

export default Login