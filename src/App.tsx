import React from 'react';
import logo from './logoSVG.svg';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  BrowserRouter,
  Routes
} from "react-router-dom";
import { Landing } from './Components/Landing/Landing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />


      </header>
      <Routes>
        <Route path={"/zenflo-studios-app"} element={<Landing />} />

      </Routes>
    </div>
  );
}

export default App;
