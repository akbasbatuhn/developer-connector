import React from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/Navigation";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import { Navbar } from "./components/layout/Navbar";

import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Landing />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
