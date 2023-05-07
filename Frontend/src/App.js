import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Receive from "./components/Receive/Receive.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>

        <Routes>
          <Route exact path ="/" element={<Home/>}/>
          <Route exact path="/receiveFile" element={<Receive/>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;

