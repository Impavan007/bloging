import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IoSearchOutline } from 'react-icons/io5';
import Categories from './Categories';
import "./Componentstyle.css/Nav.css"
import Login from '../pages/Login';
import Register from '../pages/Register';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../Redux/userSlice';
import { FaRegPlusSquare } from "react-icons/fa";
import Upload from './CreateBlog';


function NavScrollExample({ hide,setsearchQ }) {
  const {currentUser} = useSelector(state=>state.user);
  const dispatch = useDispatch()
  const [signup, setsignup] = useState(false);
  const [search, setsearch] = useState(false);
  const [login, setLogin] = useState(false);
  const [show, setshow] = useState(0);
  const navigate=useNavigate();
  let ele;
  const showElement = () => {
    switch (show) {
      case 1:
        return (ele = <Login setshow={setshow} />);

        break;
      case 2:
        return (ele =<Register setshow={setshow}  />);
      case 3:
          return (ele =<Upload setshow={setshow}  />);
  
        break;
        
     

      default:
        break;
    }
  };
  const handleLogout=async(e)=>{
    e.preventDefault();
    dispatch(logOut());
  }

  return (
    <>
      { show? showElement() :(
        <Navbar expand="lg" className="bg-body-tertiary NavBody" fixed="top">
          <Container fluid>
           <Link to="/" style={{textDecoration:"none"}}> <Navbar.Brand href="#" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2vh" }}>
              <img src='/assets/logo.png' style={{ height: "4vw" }} />
              <h4 style={{ marginTop: "2vh" }}>Your Blog</h4>
            </Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ backgroundColor: "white", maxHeight: "100px" }} navbarScroll>
                {/* Add your navigation links here */}
              </Nav>
              {search ? (
                <Form className="SearchData mr-2 mt-2">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e)=>setsearchQ(e.target.value)}
                  />
                  <Button onClick={() => {setsearch(!search);navigate("/Search")}}>Search</Button>
                </Form>
              ) : (
                <div className='search_2 mt-2'>
                  <IoSearchOutline className='mb-2' onClick={() => setsearch(!search)} />
                  <h3 >Search</h3>
                </div>
              )}
             { currentUser?
             <div className='signout-Div'>
              
              
             
             
           
              <div className='userDetail'>
              <h3 onClick={() => setshow(3)} ><FaRegPlusSquare/></h3>
              <h3 >{currentUser.userName}</h3>
              <div className='userProfile'style={{marginBottom:"2vh"}}><img style={{borderRadius:"50%",objectFit:"cover" ,border:"3px solid gray"}} src={currentUser.imgUrl}/></div>
              
              </div>
              <button onClick={handleLogout} className='navButton'>Signout</button>
              </div>
              :<div className='Sign-div'>
                <h4 onClick={() => setshow(2)}  style={{ cursor: "pointer" }}>Sign-up</h4>
                <h4  onClick={() => setshow(1)}style={{ cursor: "pointer" }}>Sign-In</h4>
              </div>}
            </Navbar.Collapse>
          
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default NavScrollExample;
