import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PostDetail from "./Pages/PostDetail";
import CreatePost from "./Pages/CreatePost";
import EditPage from "./Pages/EditPage";
import Profile from "./Pages/Profile";
import { UserContextProvider } from "./Context/UserContext";
import Nav from "./Components/Nav";
import MyBlog from "./Pages/MyBlog";

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<CreatePost />} />
          <Route path="/posts/post/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/myblogs/:id" element={<MyBlog />} />
        </Routes>
      </UserContextProvider>
      <Footer />
    </>
  );
};

export default App;
