import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { loadUser } from "./store/user/user.action";
import store from "./store/store";
import setAuthToken from "./utils/user.utils";

import Navigation from "./routes/Navigation";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import { Navbar } from "./components/layout/Navbar";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);
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
