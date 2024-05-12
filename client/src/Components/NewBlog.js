import React, { useEffect, useState } from "react";
import './Componentstyle.css/NewBlog.css';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import axios from "axios";
import { GrFormView } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { follow } from "../Redux/userSlice";
import { Link } from "react-router-dom";
import { like } from "../Redux/BlogSlice";

function Blog({feedBlogData,address}){

        const {currentUser} = useSelector(state=>state.user);
        const dispatch = useDispatch();
        const [Bloguser, setBloguser] = useState([])

        useEffect(() => {
          const fetchUsers=async()=>{
                try {
                    const res = await axios.get(`user/find/${feedBlogData.userId}`);
                    setBloguser(res.data);  
                } catch (error) {
                        console.log(error.message)
                }
          }
          fetchUsers()
         
        }, [feedBlogData.userId]);

        const handleFollow=async()=>{
                try {
                  currentUser.following.includes(Bloguser._id)?
              await axios.put(`/user/unfollow/${Bloguser._id}`):await axios.put(`/user/follow/${Bloguser._id}`)
              dispatch(follow(Bloguser._id))
                } catch (error) {
                  console.log(error)
                }
              }
              console.log(currentUser)
              const handleLike=async()=>{
                try {
                  await axios.put(`/user/like/${feedBlogData._id}`);
                  dispatch(like(currentUser._id))
                  
                } catch (error) {
                  console.log(error)
                }
                }
        return(
                <div className="cards">
                <div className="card">
                <div className="downBody">
                        <div className="flex items-center justify-center">
                                <div className="userProfile"> <img className="userProfile" src={Bloguser.imgUrl}/></div>
                                <h1 className="text-xl text-orange-500 ml-2">{Bloguser.userName}</h1>
                                </div>
                                
                            <div className="button_Div"><button className="button_follow" onClick={handleFollow}>{currentUser?.following.includes(Bloguser._id)?"following":"follow"}</button></div>
                                        
                                
                                </div>
                        <img src={feedBlogData.ImgUrl} alt="mypic" className="card__img" />
                        <div className="card__info" >
                                <h1 className="card__cetegory text-4xl text-orange-500 ">{feedBlogData.title}</h1>
                                <p className="card__title">{feedBlogData.description}<Link style={{cursor:"pointer"}} to={address}>...see more</Link></p>
                              

                        </div>
                        <div className="Like">
                               <div className="likeDiv" onClick={handleLike} > {feedBlogData.likes.includes(currentUser?._id)?<AiFillLike className="likIcon" />:<AiOutlineLike className="likIcon"/>}
                {" "}{feedBlogData.likes?.length-1}person like this</div>
                               <div className="likeDiv"> <Link to={address} set><FaComment  className="likIcon" /></Link>{feedBlogData.Comments.length-1}</div>
                                <div className="likeDiv"><FaShare  className="likIcon"/>4</div>
                                <div className="likeDiv"><GrFormView  className="likIcon"/>{feedBlogData.views} views</div>

                        </div>
                        <div>created at </div>
                </div>

        </div>

        );
}
 
export default Blog;