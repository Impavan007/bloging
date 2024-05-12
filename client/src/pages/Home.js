import React, { useEffect, useState } from "react";
import "../styles.css/Home.css";

import { Link } from "react-router-dom";
import Blog from "../Components/NewBlog";
import { MdEmojiEmotions } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import Card from 'react-bootstrap/Card';

import BasicExample from "../Components/Card";
import Categories from "../Components/Categories";

import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import { useSelector } from "react-redux";



const Home = ({type}) => {
  const {currentUser} = useSelector(state=>state.user);
  const [feedBlog, setfeedBlog] = useState([]);
  const [categoryShow, setcategoryShow] = useState(false);
const [categoryQ, setcategoryQ] = useState("")
  
  
  useEffect(() => {
    const fetchblog=async()=>{
      try {
        let res;
        if(categoryShow){
          res= await axios.get(`blog/Categorised?q=${categoryQ}`);
        }else{
          res= await axios.get(`blog/${type}`);
        }
        setfeedBlog(res.data);
       
      } catch (error) {
        console.log(error.message);
      }
    
    
    }
    fetchblog();
      }, [type,categoryQ]);
 

  console.log(feedBlog);
  
  return (
    
    <div className="home" >
   <Categories setcategoryQ={setcategoryQ} setcategoryShow={setcategoryShow}/>
      <div className="homeLeft" >
     {currentUser&&<BasicExample/>}
  

      </div>

      <div className="Homecontainer">
       

        <div className="blog_Column">
        {feedBlog?(feedBlog.map((feedBlogData) => {
  return (
    
      <Blog feedBlogData={feedBlogData} className="blog_Posts" key={feedBlogData._id} address={`/blog/${feedBlogData._id}`}/>
  );
})):(<div className="loader"></div>)}

          
       
   
  
        </div>
      </div>
      <div className="homeRight">
          


  
    <Card >
      <Card.Header>Top 5 Author</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item style={{display:"flex",alignItems:"center",gap:"1vw"}}><div className="userProfile" style={{marginLeft:"-1vw"}}><img src=""/></div>Cras justo odio</ListGroup.Item>
        <ListGroup.Item  style={{display:"flex",alignItems:"center",gap:"1vw"}}><div className="userProfile" style={{marginLeft:"-1vw"}}><img src=""/></div>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item style={{display:"flex",alignItems:"center",gap:"1vw"}}><div className="userProfile" style={{marginLeft:"-1vw"}}><img src=""/></div>Vestibulum at eros</ListGroup.Item>
        <ListGroup.Item style={{display:"flex",alignItems:"center",gap:"1vw"}}><div className="userProfile" style={{marginLeft:"-1vw"}}><img src=""/></div>Vestibulum at eros</ListGroup.Item>
        <ListGroup.Item style={{display:"flex",alignItems:"center",gap:"1vw"}}><div className="userProfile" style={{marginLeft:"-1vw"}}><img src=""/></div>Vestibulum at eros</ListGroup.Item>
       
       
      
        
      </ListGroup>
    </Card>
       
      </div>
    </div>
  );
};

export default Home;
