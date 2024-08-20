import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../src/pages/signup";
import NextSignup from "./pages/nextSignup";
import Product from "./pages/product";
import Home from "./pages/home";
import Login from "./pages/login";
import Main from "./pages/main";
import Write from "./pages/write";
import DetailProduct from "./components/Product/DetailProduct";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="register" element={<Signup />}></Route>
        <Route path="register/signup" element={<NextSignup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/write" element={<Write />}></Route>
        <Route path="/product/:id" element={<DetailProduct />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
