import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { loadUser } from "./store/user/user.action";
import store from "./store/store";
import setAuthToken from "./utils/user.utils";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProfileForm from "./components/profile-form/ProfileForm";
import PrivateRoute from "./components/routing/PrivateRoute";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";

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
        <Route path="/" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profiles" element={<Profiles />} />

        <Route
          path="dashboard"
          element={<PrivateRoute path="/dashboard" component={Dashboard} />}
        />
        <Route
          path="create-profile"
          element={
            <PrivateRoute path="/create-profile" component={ProfileForm} />
          }
        />
        <Route
          path="edit-profile"
          element={
            <PrivateRoute path="/edit-profile" component={ProfileForm} />
          }
        />
        <Route
          path="add-experience"
          element={<PrivateRoute component={AddExperience} />}
        />
        <Route
          path="add-education"
          element={<PrivateRoute component={AddEducation} />}
        />
      </Routes>
    </>
  );
};

export default App;
