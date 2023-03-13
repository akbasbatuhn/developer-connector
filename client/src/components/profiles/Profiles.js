import React, { useEffect } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { getAllProfiles } from "../../store/profile/profile.actions";

import ProfileItem from "./ProfileItem";
import Spinner from "../spinner/Spinner";

const Profiles = ({ getAllProfiles, profile: { profiles, isLoading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <div className="container">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </>
      )}
    </div>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
