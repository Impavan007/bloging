import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from '../Components/NewBlog';
import '../styles.css/Search.css'

const Search = ({searchQ}) => {
    const [SearchData, setSearchData] = useState([])
    useEffect(() => {
  const FetchSearchData=async()=>{
    try {
        console.log(searchQ)
        const res = await axios.get(`blog/search?q=${searchQ}`);
        setSearchData(res.data);
    } catch (error) {
        console.log(error.message)
    }
  }
  FetchSearchData()
    }, [searchQ])
    console.log(SearchData);

  return (
    <div className='searchColumn'>
        <div className='SearchPage'>
        <div className="blog_Column">
        {SearchData?(SearchData.map((data) => {
  return (
    
      <Blog feedBlogData={data} className="blog_Posts" key={data._id} address={`/blog/${data._id}`}/>
  );
})):(<div className="loader"></div>)}

          
       
   
  
        </div>
        </div>
    </div>
  )
}

export default Search