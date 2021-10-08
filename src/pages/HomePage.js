import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "POSTS_REQUEST":
      return { ...state, loading: true };
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "POSTS_FAIL":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "USERS_REQUEST":
      return { ...state, loadingUsers: true };
    case "USERS_SUCCESS":
      return {
        ...state,
        loadingUsers: false,
        users: action.payload,
        errorUsers: "",
      };
    case "USER_SUCCESS":
      return {
        ...state,
        loadingUsers: false,
        user: action.payload,
        errorUsers: "",
      };
    case "USERS_FAIL":
      return {
        ...state,
        errorUsers: action.payload,
        loadingUsers: false,
      };
    default:
      return state;
  }
};

const HomePage = () => {
  const { query, userId } = useParams();

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    posts: [],
    loadingUsers: false,
    errorUsers: "",
    users: [],
    user: {},
  });

  const {
    loading,
    error,
    posts,
    loadingUsers,
    errorUsers,
    users,
    user,
  } = state;

  const loadPosts = async () => {
    dispatch({ type: "POSTS_REQUEST" });
    try {
      const { data } = await axios.get(
        userId
          ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
          : `https://jsonplaceholder.typicode.com/posts`,
      );
      const filteredPosts = query
        ? data.filter((item) => {
            return (
              item.title.indexOf(query) >= 0 ||
              item.body.indexOf(query) >= 0
            );
          })
        : data;
      dispatch({
        type: "POSTS_SUCCESS",
        payload: filteredPosts,
      });
    } catch (err) {
      dispatch({
        type: "POSTS_FAIL",
        payload: err.message,
      });
    }
  };

  const loadUsers = async () => {
    dispatch({ type: "USERS_REQUEST" });
    try {
      const { data } = await axios.get(
        userId
          ? `https://jsonplaceholder.typicode.com/users/${userId}`
          : `https://jsonplaceholder.typicode.com/users`,
      );
      dispatch({
        type: userId ? "USER_SUCCESS" : "USERS_SUCCESS",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "USERS_FAIL",
        payload: err.message,
      });
    }
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, [query, userId]);

  return (
    <div>
      {userId && (
        <Link to="/" className="backToPosts">
          Back to posts
        </Link>
      )}
      {query && (
        <Link to="/" className="backToPosts">
          Back to posts
        </Link>
      )}
      <div className="blog">
        <div className="content">
          {userId ? (
            <h1>Results from: {user.name}</h1>
          ) : query ? (
            <h1>Serch keyword: "{query}"</h1>
          ) : (
            <h1>Posts</h1>
          )}

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : posts.length === 0 ? (
            <div>No posts found</div>
          ) : (
            <ul className="blog-content">
              {posts.map(({ id, title, body, userId }) => {
                return (
                  <li key={id}>
                    <Link to={`/post/${id}`}>
                      <h2>{title}</h2>
                    </Link>
                    <p>{body}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="sidebar">
          {!userId && <h2>Authors</h2>}
          {loadingUsers ? (
            <div>Loading...</div>
          ) : errorUsers ? (
            <div>Error: {errorUsers}</div>
          ) : users.length === 0 ? (
            <div>No authors found</div>
          ) : userId ? (
            <div>
              <h2>{user.name}</h2>
              <ul>
                <li>Email: {user.email}</li>
                <li>Phone: {user.phone}</li>
                <li>Website: {user.website}</li>
              </ul>
            </div>
          ) : (
            <ul>
              {users.map(({ id, name }) => {
                return (
                  <li key={id}>
                    <Link to={`/user/${id}`}>{name}</Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
