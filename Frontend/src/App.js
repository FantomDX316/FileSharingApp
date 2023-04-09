import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>

        <Routes>
          <Route exact path ="/" element={<Home/>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;

