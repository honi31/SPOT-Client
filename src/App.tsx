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
import Chat from "./pages/chat";
import Search from "./pages/search";
import MyPage from "./pages/mypage";
import ChangePassword from "./pages/changepassword";
import ChatList from "./pages/chatlist";
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
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
        <Route path="/chatlist" element={<ChatList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
