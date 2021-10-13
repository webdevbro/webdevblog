import axios from "axios";
import React, {
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "POST_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POST_SUCCESS":
      return {
        ...state,
        loading: false,
        post: action.payload,
        error: "",
      };
    case "POST_FAIL":
      return {
        ...state,
        loadingUser: false,
        errorUser: action.payload,
      };
    default:
      return state;
  }
};

const PostPage = () => {
  const { backendAPI } = useContext(ThemeContext);
  const { postId } = useParams();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    post: { user: {} },
  });
  const { loading, error, post } = state;

  const loadPost = async () => {
    dispatch({ type: "POST_REQUEST" });
    try {
      const { data } = await axios.get(
        `${backendAPI}/posts/${postId}`,
      );
      const { data: userData } = await axios.get(
        `${backendAPI}/users/${data.userId}`,
      );
      dispatch({
        type: "POST_SUCCESS",
        payload: { ...data, user: userData },
      });
    } catch (err) {
      dispatch({ type: "POST_FAIL", payload: err.message });
    }
  };

  useEffect(() => {
    loadPost();
  }, [backendAPI]);

  return (
    <div>
      <Link to="/" className="backToPosts">
        Back to posts
      </Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="blog">
          <div className="content blog-content">
            <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </div>
          <div className="sidebar">
            <ul>
              <li>
                <h4>{post.user.name}</h4>
                <p>Email: {post.user.email}</p>
                <p>Phone: {post.user.phone}</p>
                <p>Website: {post.user.website}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
