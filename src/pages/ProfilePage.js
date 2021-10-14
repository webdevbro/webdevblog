import axios from "axios";
import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ThemeContext } from "../ThemeContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        updatedUser: action.payload,
        success: true,
      };
    case "UPDATE_FAIL":
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

const ProfilePage = () => {
  const { user, setUser } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    updatedUser: null,
    error: "",
    success: false,
  });
  const { loading, updatedUser, error, success } = state;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "UPDATE_REQUEST" });
    try {
      const { data } = await axios.put(
        `/api/users/${user.id}`,
        { ...user, name, email, password, phone, website },
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "UPDATE_FAIL",
        payload: err.message,
      });
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    if (updatedUser) {
      setUser(updatedUser);
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setWebsite(user.website);
    }
  }, [updatedUser]);

  return (
    <div className="loginRegister">
      <h1 className="pageTitle">{user.name}'s profile</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div className="form-item">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="name">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password not shown for security purposes. "
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="name">Phone:</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="name">Website:</label>
          <input
            type="text"
            name="website"
            id="website"
            value={website}
            onChange={(event) => {
              setWebsite(event.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label></label>
          <button type="submit" className="btn">
            Update
          </button>
        </div>
        <div className="form-item">
          <label></label>
          <button
            type="button"
            className="btn"
            onClick={logoutHandler}
          >
            Logout
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
            <span className="error">Error...</span>
          </div>
        )}
        {success && (
          <div className="form-item">
            <label></label>
            <span className="success">
              Profile updated successfully...
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
