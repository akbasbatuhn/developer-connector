import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import PropTypes from "prop-types";

import { getPost } from "../../store/post/post.action";

import PostItem from "../posts/PostItem";
import Spinner from "../spinner/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, isLoading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return isLoading || post === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>
      <PostItem post={post} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} postId={post._id} />
        ))}
      </div>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
