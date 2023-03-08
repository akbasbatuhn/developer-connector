import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { PropTypes } from "prop-types";

import { logout } from "../../store/user/user.action";

const Navbar = ({ logout, auth: { isAuthenticated } }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <a href="#!">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        {}
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.userReducer
});

export default connect(mapStateToProps, { logout })(Navbar);