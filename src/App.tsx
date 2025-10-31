import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Landing } from './Pages/Landing/Landing';
import  Header  from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Contact from './Pages/Contact/Contact';
import Work from './Pages/Works/Work';
import { ScrollToTop } from './Components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <div className="App">
        <ScrollToTop />
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
