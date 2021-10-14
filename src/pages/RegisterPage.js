import axios from "axios";
import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { ...state, loading: true };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        loggedInUser: action.payload,
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const RegisterPage = () => {
  const { user, setUser } = useContext(ThemeContext);
  const history = useHistory();
  if (user) {
    history.push("/profile");
  }
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    loggedInUser: null,
  });
  const { loading, error, loggedInUser } = state;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "REGISTER_REQUEST" });
    try {
      const { data } = await axios.post(`/api/users`, {
        name,
        email,
        password,
        id: Math.floor(Math.random() * 1000000),
      });
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: err.message,
      });
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
      return history.push("/profile");
    }
  }, [loggedInUser]);

  return (
    <div className="loginRegister">
      <h1>Register User</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            autoComplete="off"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            required
            autoComplete="off"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="email">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label></label>
          <button type="submit" className="btn">
            Register
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
        <div className="form-item">
          <label></label>
          <span className="btn">
            Already have an account?{" "}
            <Link to="/login">Login!</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
