import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Landing } from './Pages/Landing/Landing';
import  Header  from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Contact from './Pages/Contact/Contact';
import Work from './Pages/Works/Work';
import { ScrollToTop } from './Components/ScrollToTop/ScrollToTop';
import ProposolRoga from './Pages/Presentation/ProposolRoga';

function App() {
  return (
    <div className="App">
        <ScrollToTop />

      <Routes>
        {/* Route without header and footer */}
        <Route path="/proposol-roga" element={<ProposolRoga/>}/>

        {/* Routes with header and footer */}
        <Route path="*" element={
          <>
            <Header/>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/work" element={<Work/>} />
            </Routes>
            <Footer/>
          </>
        }/>
      </Routes>
    </div>
  );
}

export default App;
