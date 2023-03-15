import React, { useEffect } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { getPosts } from "../../store/post/post.action";

import Spinner from "../spinner/Spinner";
import PostItem from "./PostItem";

const Posts = ({ getPosts, post: { posts, isLoading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="container">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community
        </p>
        {/* PostForm */}
        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
