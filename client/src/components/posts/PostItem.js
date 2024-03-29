import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import { formatDate } from "../../utils/format-date.utils";

import { likePost, removeLike, deletePost } from "../../store/post/post.action";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  likePost,
  removeLike,
  deletePost
}) => {
  const navigate = useNavigate();

  const onClickHandler = (e) => {
    e.preventDefault();
    deletePost(_id);
    navigate("/posts");
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(date)}</p>

        <button
          type="button"
          className="btn btn-light"
          onClick={() => likePost(_id)}
        >
          <i className="fas fa-thumbs-up"></i>
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => removeLike(_id)}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/posts/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.isLoading && user === auth.user._id && (
          <button
            onClick={onClickHandler}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { likePost, removeLike, deletePost })(
  PostItem
);
