import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, isLoading }
}) => {
  if (isLoading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
