import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "../styles.css/Blogpage.css";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import axios from "axios";
import { GrFormView, GrLike } from "react-icons/gr";
import { fetchFailure, fetchStart, fetchSucess, like } from '../Redux/BlogSlice';
import Comments from '../Components/Comments';
const BlogPage = () => {
  const{currentUser}= useSelector(state=>state.user);
const {currentblog} = useSelector(state=>state.blog);
  const blogId = useLocation().pathname.split('/')[2];
const [bloger, setbloger] = useState({});
const dispatch=useDispatch();
const  [showCommentSection, setshowCommentSection] = useState(false);


useEffect(() => {
  const fetchVideo=async()=>{
    dispatch(fetchStart());
    try {
   const blogRes = await axios.get(`/blog/find/${blogId}`);
   const bloggerRes = await axios.get(`/user/find/${blogRes.data.userId}`);
   setbloger(bloggerRes.data);
   dispatch(fetchSucess(blogRes.data));

    } catch (error) {
      dispatch(fetchFailure())
      console.log(error.message)
    }
  }
  
fetchVideo()
 
}, [blogId,dispatch]);

const handleLike=async()=>{
  try {
    await axios.put(`/user/like/${currentblog._id}`);
    dispatch(like(currentUser._id))
    
  } catch (error) {
    console.log(error)
  }
  }
console.log(currentblog);

  return (
    <div className='container'>
        
       <div className='card_body'> 

       { <Card.Img variant="top" src={currentblog.ImgUrl||"/assets/no_image.jpg"} style={{height:"30vw"}} />}
        <div>
            <h2 style={{marginTop:"2vw",borderBottom:"1px solid black"}}>{currentblog.title}</h2>
          <Card.Text>
          {currentblog.description  }        </Card.Text>
          <div className="Like">
                               <div className="likeDiv" onClick={handleLike} >  {currentblog.likes.includes(currentUser?._id)?<AiFillLike className="likIcon" />:<AiOutlineLike className="likIcon"/>}
                {" "}{currentblog.likes?.length-1}person like this</div>
                               <div className="likeDiv"> <FaComment  className="likIcon" onClick={()=>setshowCommentSection(!showCommentSection)}/>{currentblog.Comments.length-1}</div>
                                <div className="likeDiv"><FaShare  className="likIcon"/>4</div>
                                <div className="likeDiv"><GrFormView  className="likIcon"/>{currentblog.views} views</div>

                        </div>
                       {showCommentSection&&<div>
                        <Comments blogId={currentblog._id}/>
                        </div>}
        </div>
      </div>
      <div className='blogDiv1'> 
        < div style={{width:"80%",height:"75vh"}}>
      <Card.Img variant="top" src={bloger.imgUrl||"/assets/no_image.jpg"} style={{height:"30vh"}} />
      <Card.Body >
        <Card.Title style={{marginTop:"2vh"}}>{bloger.userName}</Card.Title>
        <Card.Text style={{marginTop:"2vh"}}>
         {bloger.bio?bloger.bio: "Some quick example text to build on the card title and make up the bulk of the cards content."}
        </Card.Text>
       <Link to="#" style={{color:"white"}}> <Button variant="primary" >Visit Profile</Button></Link>
      </Card.Body>
    </div>
       
        </div>
    </div>
  )
}

export default BlogPage