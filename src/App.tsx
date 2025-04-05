import React from 'react';
import logo from './logoSVG.svg';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  BrowserRouter,
  Routes
} from "react-router-dom";
import { Landing } from './Pages/Landing/Landing';
import  Header  from './Components/Header/Header';

function App() {
  return (
    <div className="App">

        <Header/>
   


      <Routes>
        <Route path={"/zenflo-studios-app"} element={<Landing />} />

      </Routes>
    </div>
  );
}

export default App;
