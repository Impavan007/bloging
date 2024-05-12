import React, { useEffect, useState } from 'react'
import './Componentstyle.css/CreateBlog.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../Firebase.js'
import { useNavigate } from "react-router-dom";
import axios from 'axios'



const  Upload = ({setshow}) => {
const [image, setimage] = useState(undefined);
const [imagesperc, setimagesperc] = useState(0);
const [data,setdata] = useState({});
const [tags, settags] = useState([]);
const navigate = useNavigate();


const handletags=(e)=>{
    settags(e.target.value.split(","));
}
const uploadFile =async(file,urlType)=>{
    const storage = getStorage(app);
    const fileName=new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setimagesperc(Math.round(progress));
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default: 
        break;
    }
  },
(erorr)=>{console.log(erorr)},
() => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setdata((prev)=>{
            return {...prev,[urlType]:downloadURL}
        });
        
    });
  }


)};
const handlechange=(e)=>{
    setdata((prev)=>{
        return {...prev,[e.target.name]:e.target.value}
    })
}
useEffect(()=>{
image && uploadFile(image,"ImgUrl");
},[image]);
 
 


const  handleUpload=async(e)=>{
e.preventDefault();
try {
    console.log(data);
  const res=  await axios.post('/blog/createBlog',{...data,tags});
  console.log(res.data);
  setshow(0);
  res.status===201 && navigate(`/blog/${res.data._id}`);
} catch (error) {
    console.log(error.message)
}
}

  return (
    <div className='upload' >
        <div className='wraper'>
            <div className='close' onClick={()=>setshow(0)} style={{cursor:"pointer"}}><p>X</p></div>
            <div className='title'><h1 className='h1'>upload new Blog</h1></div>
           <div className='update-data'>
        <label htmlFor='title' className='label'>title:</label>
        <input type='text' className="videoInput" onChange={handlechange}  name='title'/>
        <label htmlFor='tags' className='label'>tags</label>
        <input type='text' className="videoInput"  onChange={handletags} name='tags'/>
        <label htmlFor='Type' className='label'>Type</label>
        <input type='text' className="videoInput" onChange={handlechange}  name='Type'/>
       <label htmlFor='description' className='label'>description</label>
        <textarea  rows="8" cols="2" style={{width:"80%"}}name='description'  onChange={handlechange}/>
        <label htmlFor='thumbnail' className='label'>thumbnail:</label>
       {imagesperc>0?("uploading: "+imagesperc+"%"):<input type='file' onChange={(e)=>setimage(e.target.files[0])} name='thumbnail'style={{border:"none"}} className="videoInput" accept='image/*'/>}<br/>
        <button type='submit' onClick={handleUpload} className='videodatasubmit'>upload</button>

        </div>
       
        </div>
        
    
    </div>
  )
}

export default  Upload