import React from 'react';
import logo from './logoSVG.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from './Pages/Landing/Landing';
import  Header  from './Components/Header/Header';

function App() {
  return (
    <div className="App">

        <Header/>
   


      <Routes>
      <Route path="/" element={<Landing />} />

      </Routes>
    </div>
  );
}

export default App;
