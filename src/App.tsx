import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Landing } from './Pages/Landing/Landing';
import  Header  from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Contact from './Pages/Contact/Contact';
import Work from './Pages/Works/Work';
import { ScrollToTop } from './Components/ScrollToTop/ScrollToTop';
import ProposalRoga from './Pages/Presentation/ProposalRoga';
import ProposalHernan from './Pages/Presentation/ProposalHernan';
import ProposalAllinoneinventions from './Pages/Presentation/ProposalAllinoneinventions';
import ProgenPresentation from './Pages/Presentation/ProgenPresentation';

function App() {
  return (
    <div className="App">
        <ScrollToTop />

      <Routes>
        {/* Route without header and footer */}
        <Route path="/proposal-roga" element={<ProposalRoga/>}/>
        <Route path="/proposal-hernan" element={<ProposalHernan/>}/>
         <Route path="/proposal-allinoneinventions" element={<ProposalAllinoneinventions/>}/>
        <Route path="/progen-presentation" element={<ProgenPresentation/>}/>

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
