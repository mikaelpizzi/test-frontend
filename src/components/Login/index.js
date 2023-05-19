import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
axios.defaults.withCredentials = true;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://test-api-render.onrender.com/auth/login",
        {
          username,
          password,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        // If login was successful, update state to indicate that user is logged in
        setIsLoggedIn(true);
      } else {
        console.log("An error ocurred when logging in");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Show error message to user
        setErrorMessage("Wrong credentials");
      } else {
        // Show generic error message to user
        setErrorMessage("An error ocurred when logging in");
      }
    }
  };

  // If user has successfully logged in, redirect to /notes route
  if (isLoggedIn) {
    return <Navigate to="/notes" />;
  }

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
