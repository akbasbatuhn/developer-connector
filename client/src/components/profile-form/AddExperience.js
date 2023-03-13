import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import { addExperience } from "../../store/profile/profile.actions";

const initialState = {
  company: "",
  title: "",
  location: "",
  from: "",
  to: "",
  current: false,
  description: ""
};

const AddExperience = ({ addExperience }) => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(initialState);

  const { company, title, location, from, to, current, description } =
    formFields;

  const onChangeHandler = (event) =>
    setFormFields({ ...formFields, [event.target.name]: event.target.value });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await addExperience(formFields);
    navigate("/dashboard");
  };

  return (
    <div class="container">
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmitHandler}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChangeHandler}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={onChangeHandler}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => {
                setFormFields({ ...formFields, current: !current });
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChangeHandler}
            disabled={current}
          />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={onChangeHandler}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(AddExperience);
