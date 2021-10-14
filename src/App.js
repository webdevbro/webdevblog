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
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <Router>
      <div className={`container ${theme}`}>
        <Navbar />
        <div className="main">
          <Switch>
            <PrivateRoute
              path="/profile"
              component={ProfilePage}
            />
            <PrivateRoute
              path="/create"
              component={CreatePostPage}
            />
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
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
