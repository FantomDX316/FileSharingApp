import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Receive from "./components/Receive/Receive.js";
import Alert from "./components/Alert/Alert.js";
import FileState from "./context/FileState"
import FileContext from "./context/FileContext";

function App() {
  const {alertState} = useContext(FileContext);
  return (
    <div className="App">
      <FileState>
        <Router>
          <Navbar />
          {alertState?<Alert/>:<></>}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/receiveFile" element={<Receive />} />
          </Routes>
        </Router>
      </FileState>
    </div>
  );
}

export default App;

