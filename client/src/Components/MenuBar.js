import React from 'react'
import './Componentstyle.css/Menu.css';
import { TiHome } from "react-icons/ti";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdTrendingUp } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
const MenuBar = () => {
  return (
    <div className='menuBar'>
       <Link to="/"> <TiHome/></Link>
        <AiFillPlusCircle/>
       <Link to="/trending"> <IoMdTrendingUp/></Link>
        <FaUserCircle/>
    </div>
  )
}

export default MenuBar