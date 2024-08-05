import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../src/pages/signup";
import NextSignup from "./pages/nextSignup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="register" element={<Signup />}></Route>
        <Route path="register/signup" element={<NextSignup />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
