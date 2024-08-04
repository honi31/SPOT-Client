import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../src/pages/signup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="register" element={<Signup />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
