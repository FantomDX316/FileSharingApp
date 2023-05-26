import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Receive from "./components/Receive/Receive.js";
import Alert from "./components/Alert/Alert.js";
import FileContext from "./context/FileContext.js";
import "./App.scss";

function App() {
  const context = useContext(FileContext);
  const {alertState} = context;
  return (
    <div className="App">
        <Router>
          {alertState?<Alert/>:<></>}
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/receiveFile" element={<Receive />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;

