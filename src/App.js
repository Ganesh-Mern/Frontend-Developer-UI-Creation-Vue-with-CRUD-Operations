import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Update from "./components/Update";
import Home from "./components/Home";



const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        {/* <Route path="/read/:id" element={<Read/>}/> */}
      </Routes>
     
    </BrowserRouter>
  );
};

export default App;
