import React, { useState } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { addComment } from "../../store/post/post.action";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmitHandler}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Write a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
