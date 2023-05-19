import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function withAuth(Component) {
  return function ProtectedRoute(props) {
    // Check if user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          // Make a request to your backend to check for an active session
          const response = await axios.get(
            "https://test-api-render.onrender.com/auth/check"
          );
          if (response.status === 200) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      };
      checkAuth();
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isAuthenticated) {
      // If user is authenticated, render the component
      return <Component {...props} />;
    } else {
      // If user is not authenticated, redirect to login page
      return <Navigate to="/" />;
    }
  };
}

export default withAuth;
