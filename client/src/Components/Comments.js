import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import './Componentstyle.css/Comments.css'

import { BsEmojiGrin } from "react-icons/bs";
import { useSelector } from 'react-redux';
import axios from 'axios';


const Comments = ({blogId}) => {
   
   const {currentUser}= useSelector(state=>state.user);
   const {currentblog} = useSelector(state=>state.blog);


   const [userComment, setuserComment] = useState([]);
   const[description,setdescription]=useState("");
  
   
    const postComment = async()=>{
     try {
       const res = await axios.post(`/Comment/${currentblog._id}`,{description:description});
       alert("commeted sucessfully");
       console.log(res.data);
     } catch (error) {
       console.log(error.message)
     }
    };
   
       
     useEffect(() => {
   const fetchComment =async()=>{
    try {
        const res = await axios.get(`/Comment/${blogId}` );
        setuserComment(res.data);
        console.log(res.data);
    } catch (error) {
        console.log(error.message)
    }
   }
   fetchComment()
     }, [blogId])
     
    

  return (
    <div>
    <h1 style={{marginTop:"4vh"}}> Comments </h1>
    <div className='comments'>
    <div className='thumbnail'>
<img src={currentUser?currentUser.imgUrl:""} style={{borderRadius:"50%",objectFit:"cover", height:"4vw",border:"3px solid gray"}} />
        </div>
        <div className='userInput'>
        <input className='input'  type='text' onChange={(e)=>setdescription(e.target.value)} placeholder='comment here'/>
        <hr/>
        <div className='buttons'>
        <div className='likeComment'><BsEmojiGrin/></div>
        <div className='commentSubmit'>
        <div className='cancel' style={{cursor:"pointer"}}>Cancel</div>
        <div className='submit' onClick={postComment} style={{cursor:"pointer"}} >Comment</div>
        </div>

    </div>
        </div>
       
    </div>
  
   
     <div>
  {userComment.map((com)=>(
    <Comment com={com} key={com._id}/>
  ))
   }
    </div>
    </div>
  )
}

export default Comments