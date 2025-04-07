import React from 'react';
import logo from './logoSVG.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from './Pages/Landing/Landing';
import  Header  from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">

        <Header/>
   


      <Routes>
      <Route path="/" element={<Landing />} />
     

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
