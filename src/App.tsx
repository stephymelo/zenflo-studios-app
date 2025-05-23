import React from 'react';
import logo from './logoSVG.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from './Pages/Landing/Landing';
import  Header  from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Contact from './Pages/Contact/Contact';
import Work from './Pages/Works/Work';

function App() {
  return (
    <div className="App">

        <Header/>
   


      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/contact" element={<Contact/>} /> 
      <Route path="/work" element={<Work/>} /> 
     

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
