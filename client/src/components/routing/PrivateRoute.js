import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth: { isAuthenticated } }) => {
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
