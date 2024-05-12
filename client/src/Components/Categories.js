import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Componentstyle.css/Category.css'

const Categories = ({setcategoryQ,setcategoryShow}) => {
  
  
  return (
    <div className='Category'>
        <div className='Category_content' onClick={()=>{setcategoryQ("Crypto");setcategoryShow(true)}}>Crypto</div>
        <div className='Category_content' onClick={()=>{setcategoryQ("Finance");setcategoryShow(true)}}>Finance</div>
        <div className='Category_content' onClick={()=>{setcategoryQ("Education");setcategoryShow(true)}}>Education</div>
        <div className='Category_content' onClick={()=>{setcategoryQ("International");setcategoryShow(true)}}>International</div>
        <div className='Category_content' onClick={()=>{setcategoryQ("Top blog_Posts");setcategoryShow(true)}}>Top blog_Posts</div>
        <div className='Category_content' onClick={()=>{setcategoryQ("Cooking");setcategoryShow(true)}}>Cooking</div>
        <div className='Category_content' onClick={()=>{setcategoryQ("Scifi");setcategoryShow(true)}}>Scifi</div>
        <div className='Category_content' onClick={()=>{setcategoryQ("Fiction");setcategoryShow(true)}}>Fiction</div>
        <div className='Category_content' onClick={()=>{setcategoryQ("coding");setcategoryShow(true)}}>coding</div>
        <div className='Category_content' onClick={()=>{setcategoryQ("Video Games");setcategoryShow(true)}}>Video Games</div>
        <div className='Category_content' onClick={()=>{setcategoryQ("Trending");setcategoryShow(true)}}>Trending</div>
    </div>
  )
}

export default Categories