import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeContext } from "./ThemeContext";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <Router>
      <div className={`container ${theme}`}>
        <Navbar />
        <div className="main">
          <Switch>
            <Route path="/post/:postId">
              <PostPage />
            </Route>
            <Route path="/search/:query?">
              <HomePage />
            </Route>
            <Route path="/user/:userId">
              <HomePage />
            </Route>
            <Route path="/" exact>
              <HomePage />
            </Route>
          </Switch>
        </div>
        <div className="footer">
          WEBDEVBLOG &copy; 2021 all rights reserved
        </div>
      </div>
    </Router>
  );
}

export default App;
