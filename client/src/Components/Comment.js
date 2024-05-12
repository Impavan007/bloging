import React, { useEffect, useState } from 'react'
import './Componentstyle.css/Comment.css'
import axios from 'axios';
const Comment = ({com}) => {
  const [CommentUser, setCommentUser] = useState({})
  useEffect(() => {
   const fetchCommentUser = async()=>{
    try {
      const res = await axios.get(`/user/find/${com.userId}`);
      setCommentUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.message)
    }
   };
   fetchCommentUser()
  }, [com.userId]);
 
  
  return (
    <div className='comment'>
        <div className='userImage'>
            <div className='thumbnail'>
                <img src={CommentUser.imgUrl||""}  style={{borderRadius:"50%",objectFit:"cover", height:"4vw", width:"4vw",border:"3px solid gray"}} />
            </div>
        </div>
        <div className='commenSection'>
            <div className='commentdt'>
            <div><h4>{CommentUser.userName}</h4></div>
            <div className='commentedon'>2 days ago</div>
            </div>
            <div className='commentpara'>{com.description}</div>
        </div>
        
    </div>
  )
}

export default Comment;