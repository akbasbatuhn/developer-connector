import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useMatch, useNavigate } from "react-router-dom";

import {
  createProfile,
  getCurrentProfile
} from "../../store/profile/profile.actions";

import PropTypes from "prop-types";

const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: ""
};

const ProfileForm = ({
  profile: { profile, isLoading },
  createProfile,
  getCurrentProfile
}) => {
  const [formFields, setFormFields] = useState(initialState);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const creatingProfile = useMatch("/create-profile");
  const navigate = useNavigate();

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) getCurrentProfile();

    // if we finish loading and we do have a profile
    // then build profile data
    if (!isLoading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }

      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }

      // the skills may be an array from our API response
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");

      // set local state with the profileData
      setFormFields(profileData);
    }
  }, [isLoading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formFields;

  const handleToggleSocialInputs = () => {
    toggleSocialInputs(!displaySocialInputs);
  };

  const onChangeHandler = (event) =>
    setFormFields({ ...formFields, [event.target.name]: event.target.value });

  const createProfileAndNavigate = async (formFields) => {
    await createProfile(formFields);
    navigate("/dashboard");
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const editing = profile ? true : false;
    createProfileAndNavigate(formFields, editing);
  };

  return (
    <div className="container">
      <h1 className="large text-primary">
        {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i>{" "}
        {creatingProfile
          ? "Let's get some information to make your profile stand out"
          : "Add some changes to your profile"}
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChangeHandler}>
            <option>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChangeHandler}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChangeHandler}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChangeHandler}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChangeHandler}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChangeHandler}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChangeHandler}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={handleToggleSocialInputs}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChangeHandler}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChangeHandler}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChangeHandler}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChangeHandler}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChangeHandler}
              />
            </div>
          </>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
