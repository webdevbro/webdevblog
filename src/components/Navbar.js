import React, { useContext, useState } from "react";
import {
  Link,
  NavLink,
  useHistory,
} from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme, user } =
    useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/search/${query}`);
  };
  return (
    <div className="header">
      <div className="header-item">
        <Link to="/">webdevblog</Link>
      </div>
      <div className="header-item">
        <form onSubmit={handleSubmit}>
          <input
            name="query"
            type="text"
            autoComplete="off"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          <button type="submit">Go</button>
        </form>
      </div>
      <div className="header-item">
        {user ? (
          <>
            <NavLink to="/profile" activeClassName="active">
              {user.name}
            </NavLink>{" "}
            <NavLink
              to="/create-post"
              activeClassName="active"
            >
              Create post
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        )}{" "}
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
