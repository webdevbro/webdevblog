import { createContext, useState } from "react";

const ThemeContext = createContext();

const lsUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const lsTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState(lsTheme);
  const [user, setUser] = useState(lsUser);
  /* const [backendAPI, setBackendAPI] = useState(
    "https://jsonplaceholder.typicode.com",
  ); */
  /* const toggleBackendAPI = () => {
    setBackendAPI(
      backendAPI === "/api"
        ? "https://jsonplaceholder.typicode.com"
        : "/api",
    );
  }; */
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem(
      "theme",
      theme === "light" ? "dark" : "light",
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        setUser,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
