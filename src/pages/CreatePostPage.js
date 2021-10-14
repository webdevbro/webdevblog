import axios from "axios";
import React, {
  useContext,
  useReducer,
  useState,
} from "react";
import { ThemeContext } from "../ThemeContext";

const initialState = {
  loading: false,
  createdPost: null,
  error: "",
  success: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_RESET":
      return initialState;
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        createdPost: action.payload,
        success: true,
      };
    case "CREATE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

const CreatePostPage = () => {
  const { user, backendAPI } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const { loading, error, createdPost, success } = state;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const reset = () => {
    dispatch({ type: "CREATE_RESET" });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "CREATE_REQUEST " });
    try {
      if (title !== "" && body !== "") {
        const { data } = await axios.post(
          `${backendAPI}/posts`,
          {
            title,
            body,
            userId: user.id,
            id: Math.floor(Math.random() * 1000000),
          },
        );
        dispatch({ type: "CREATE_SUCCESS", payload: data });
        setTitle("");
        setBody("");
      } else {
        alert("Both fields are required!");
      }
    } catch (err) {
      dispatch({
        type: "CREATE_FAIL",
        payload: err.message,
      });
    }
  };
  return (
    <div className="loginRegister">
      <h1 className="pageTitle">Create Post Page</h1>
      {success ? (
        <>
          <p>
            Post titled <strong>{createdPost.title}</strong>{" "}
            has been created successfully.
          </p>
          <button onClick={reset}>
            Create another post
          </button>
        </>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              id="title"
              type="text"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="title">Body</label>
            <textarea
              name="body"
              id="body"
              onChange={(event) => {
                setBody(event.target.value);
              }}
            ></textarea>
          </div>
          <div className="form-item">
            <label></label>
            <button className="btn" type="submit">
              Create Post
            </button>
          </div>
          {loading && (
            <div className="form-item">
              <label></label>
              <span>Processing...</span>
            </div>
          )}
          {error && (
            <div className="form-item">
              <label></label>
              <span className="error">{error}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default CreatePostPage;
