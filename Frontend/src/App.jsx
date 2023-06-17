import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import Receive from "./components/Receive/Receive.jsx";
import Alert from "./components/Alert/Alert.jsx";
import FileContext from "./context/FileContext.jsx";
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

