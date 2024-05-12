import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Home from "./pages/Home.js";
import Verify from "./pages/Verify.js";
import MenuBar from "./Components/MenuBar.js";
import NavScrollExample from "./Components/Navigation.js";
import Categories from "./Components/Categories.js";
import BlogPage from "./pages/BlogPage.js";
import Search from "./pages/Search.js";

function App() {
  const [hide, sethide] = useState(false);
  const [searchQ, setsearchQ] = useState("");
  return (
    <Router>
      <main>
        <NavScrollExample hide={hide} setsearchQ={setsearchQ} />
        <MenuBar />
        
        <Routes>
        <Route  index element={<Home type='random' setHide={sethide} />}/>
        <Route  path='/trending' element={<Home type='trend'  setHide={sethide} />}/>
          <Route exact path="/login"  element={<Login setHide={sethide}/>} />
          <Route path="/auth/:id/verify/:token"  element={<Verify />} />
          <Route exact path="/blog/:id"    element={<BlogPage />} />
          <Route path="/Search" element={<Search searchQ={searchQ}/>}/>
          
        </Routes>
      </main>
    </Router>
  );
}

export default App;
