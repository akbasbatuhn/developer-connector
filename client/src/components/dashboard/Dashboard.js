import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { getCurrentProfile } from "../../store/profile/profile.actions";

import Spinner from "../spinner/Spinner";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, isLoading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <div className="container">
      {isLoading && profile === null ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user">Welcome {user && user.name}</i>
          </p>
          {profile !== null ? (
            <>has</>
          ) : (
            <>
              <p>You have not setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);